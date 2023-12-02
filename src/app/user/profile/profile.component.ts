import { jwtDecode } from "jwt-decode";
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { userState } from 'src/app/store/state/app.state';
import { retrieveuser } from "src/app/store/state/app.actions";
import { getuser } from "src/app/store/state/app.selectors";
import { Observable, Subscription, map } from "rxjs";
import { IUserModel } from "src/app/models/user.model";
import { environment } from "src/environments/environment.development";
import { UserService } from "../services/user.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  isHovered: boolean = false;
  userid: any
  userDetails!: Observable<IUserModel | undefined>
  profile!: File | null
  userForm!: FormGroup
  changePassForm!: FormGroup
  isEditable: boolean = false;
  private subscribe = new Subscription()
  StrongPasswordRegx: RegExp = /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;

  constructor(
    private _store: Store<userState>,
    private _service: UserService,
    private _fb: FormBuilder,
    private _toastr: ToastrService,
    private _router: Router,
  ) { }

  passwordMatchValidator(password: any, confirmPass: any) {
    return (formgroup: FormGroup) => {
      const passwordcontrol = formgroup.controls[password];
      const confirmPassControl = formgroup.controls[confirmPass];

      if (confirmPassControl.errors && confirmPassControl.errors['passwordMismatch']) {
        return
      }

      if (passwordcontrol.value !== confirmPassControl.value) {
        confirmPassControl.setErrors({ passwordMismatch: true })
      }
    };
  }

  ngOnInit(): void {

    this.userForm = this._fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]]
    })

    this.changePassForm = this._fb.group({
      oldpass: ['', [Validators.required]],
      newpass: ['', [Validators.required, Validators.pattern(this.StrongPasswordRegx)]],
      confirmpass: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator('newpass', 'confirmpass') })

    const token = localStorage.getItem('userToken');
    if (token) {
      this.userid = jwtDecode(token)
    }
    this._store.dispatch(retrieveuser())
    this.userDetails = this._store.pipe(
      select(getuser),
      map(u => u.find(user => user._id == this.userid.id))
    )
  }

  update() {
    const token = localStorage.getItem('userToken');
    if (token) {
      this.userid = jwtDecode(token)
    }
    this._store.dispatch(retrieveuser())
    this.userDetails = this._store.pipe(
      select(getuser),
      map(u => u.find(user => user._id == this.userid.id))
    )
  }

  onProfileSelected(event: any): void {
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    this.profile = <File>event.target.files[0];

    if (this.profile) {
      const fileExtension = this.getFileExtension(this.profile.name);

      if (!allowedExtensions.includes(fileExtension)) {
        this.profile = null;
        alert('Please select a valid image file (jpg, jpeg, png, or gif).');
      }
    }
  }
  getFileExtension(filename: string): any {
    return filename.split('.').pop();
  }

  edit() {
    this.isEditable = true
  }

  getImage(file: string) {
    return `${environment.STATIC_FILE_API}${file}`
  }

  updateProfile() {
    const form = new FormData()
    if (this.profile) form.append('profile', this.profile, this.profile.name)
    this.subscribe.add(
      this._service.updateProfile(form).subscribe({
        next: () => {
          this.profile = null
          this.update()
          this._toastr.success('Profile Updated')
        },
        error: (err) => {
          this._toastr.error('Something went wrong', err.error.message)
        }
      })
    )
  }

  onSubmit() {
    if (this.userForm.invalid) {
      return
    }
    const userData = this.userForm.value
    this.subscribe.add(
      this._service.updateUser(userData).subscribe({
        next: () => {
          this.update()
          this.isEditable = false
          this._toastr.success('Updated Successfully !')
        },
        error: (err) => {
          this._toastr.error('Something went wrong', err.error.message)
        }
      })
    )
  }

  onSubmitPass() {
    if (this.changePassForm.invalid) {
      return
    }
    const data = this.changePassForm.value
    this.subscribe.add(
      this._service.changePass(data).subscribe({
        next: () => {
          this._router.navigate(['user-profile/profile'])
          this._toastr.success('Password Changed')
        },
        error: (err) => {
          this._toastr.error(err.error.message)
        }
      })
    )
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }

}

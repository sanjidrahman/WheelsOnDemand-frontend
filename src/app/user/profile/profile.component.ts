import jwt_decode from "jwt-decode";
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { userState } from 'src/app/store/state/app.state';
import { retrieveuser } from "src/app/store/state/app.actions";
import { getuser } from "src/app/store/state/app.selectors";
import { Observable, map } from "rxjs";
import { userModel } from "src/app/models/user.model";
import { environment } from "src/environments/environment.development";
import { UserService } from "../services/user.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  isHovered: boolean = false;
  userid: any
  userDetails!: Observable<userModel | undefined>
  profile!: File | null
  userForm!: FormGroup
  changePassForm!: FormGroup
  isEditable: boolean = false;

  constructor(
    private _store: Store<userState>,
    private _service: UserService,
    private _fb: FormBuilder
  ){}

  ngOnInit(): void {

    this.userForm = this._fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]]
    })

    this.changePassForm = this._fb.group({ 
      oldpass: ['' , [Validators.required]],
      newpass: ['' , [Validators.required]],
      confirmpass: ['', [Validators.required]]
    })

    const token = localStorage.getItem('userToken');
    if (token) {
      this.userid = jwt_decode(token)
    }
    this._store.dispatch(retrieveuser())
    this.userDetails = this._store.pipe(
      select(getuser),
      map(u=> u.find(user => user._id == this.userid.id))
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

}

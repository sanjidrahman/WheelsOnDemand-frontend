import { Component } from '@angular/core';
import { AdminService } from '../services/admin.services';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-add-vehicle',
  templateUrl: './admin-add-vehicle.component.html',
  styleUrls: ['./admin-add-vehicle.component.css']
})
export class AdminAddVehicleComponent {

  files: File[] = [];
  selectedfiles: File[] = []
  vehicleForm!: FormGroup
  transmission: string[] = ['Automatic', 'Manual'];
  fuel: string[] = ['Petrol', 'Diesel', 'Electric']
  isLinear = false;
  document!: File | null
  firstFormGroup!: FormGroup
  secondFormGroup!: FormGroup

  constructor(
    private _fb: FormBuilder,
    private _toastr: ToastrService,
    private _service: AdminService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.vehicleForm = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      brand: ['', [Validators.required, Validators.minLength(3)]],
      model: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      transmission: ['', Validators.required],
      fuel: ['', Validators.required],
      location: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
    })

    this.firstFormGroup = this._fb.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._fb.group({
      secondCtrl: ['', Validators.required],
    });
   
  }

  getFile(event: any) {
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    if (event.target.files.length > 0) {
      const n = event.target.files.length
      for (let i = 0; i < n; i++) {
        const file = event.target.files[i]
        const extension = this.getFileExtension(file.name)
        if (allowedExtensions.includes(extension)) {
          this.files.push(file.name)
        } else {
          alert('Please select a valid image file (jpg, jpeg, png, or gif).');
        }
      }
      this.selectedfiles = event.target.files
    }
  }
  getFileExtension(filename: string): any {
    return filename.split('.').pop();
  }

  getDocument(event: any) {
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    this.document = <File>event.target.files[0];

    if (this.document) {
      console.log(this.document);
      const fileExtension = this.getFileExtensionn(this.document.name);

      if (!allowedExtensions.includes(fileExtension)) {
        this.document = null;
        alert('Please select a valid image file (jpg, jpeg, png, or gif).');
      }
    }
  }
  getFileExtensionn(filename: string): any {
    return filename.split('.').pop();
  }

  click() {
    console.log(this.firstFormGroup.controls ,this.secondFormGroup.controls);
  }

  onSubmit() {
    if (this.vehicleForm.invalid && this.firstFormGroup && this.secondFormGroup) {
      return
    }
    const form = new FormData()
    let data = this.vehicleForm.getRawValue()
    form.append('name', data.name);
    form.append('brand', data.brand);
    form.append('model', data.model);
    form.append('transmission', data.transmission);
    form.append('fuel', data.fuel);
    form.append('location', data.location);
    form.append('price', data.price);
    if(this.document) form.append('doc', this.document, this.document?.name)
    for (const file of this.selectedfiles) {
      form.append('files', file, file.name);
    }

    this._service.addvehicle(form).subscribe({
      next: (res) => {
        console.log(res);
        this._router.navigate(['/admin/a/vehicles'])
        this._toastr.success('Registered vehicle to collection!')
      },
      error: (err) => {
        this._toastr.error(err.error.message)
      }
    })
  }

}

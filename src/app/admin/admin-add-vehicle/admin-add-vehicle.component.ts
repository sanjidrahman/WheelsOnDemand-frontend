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
      price: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
    })
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

  
  onSubmit() {
    if (this.vehicleForm.invalid) {
      return
    }
    const form = new FormData()
    let data = this.vehicleForm.getRawValue()
    form.append('name', data.name);
    form.append('brand', data.brand);
    form.append('model', data.model);
    form.append('transmission', data.transmission);
    form.append('fuel', data.fuel);
    form.append('price', data.price);
    for (const file of this.selectedfiles) {
      form.append('files', file , file.name);
    }
    
  }

}

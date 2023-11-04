import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HostService } from '../services/host.service';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-host-add-vehicle',
  templateUrl: './host-add-vehicle.component.html',
  styleUrls: ['./host-add-vehicle.component.css']
})
export class HostAddVehicleComponent implements OnInit {

  files: File[] = [];
  selectedfiles: File[] = []
  document!: File | null;
  vehicleForm!: FormGroup
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  transmission: string[] = ['Automatic', 'Manual'];
  fuel: string[] = ['Petrol', 'Diesel', 'Electric']
  isLinear = false;

  constructor(
    private _fb: FormBuilder,
    private _toastr: ToastrService,
    private _service: HostService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.vehicleForm = this._fb.group({
      name: ['', Validators.required],
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
    form.append('location', data.location);
    form.append('price', data.price);
    if(this.document) form.append('doc', this.document, this.document?.name)
    for (const file of this.selectedfiles) {
      form.append('files', file , file.name);
    }
    this._service.addvehicle(form).subscribe({
      next: () => {
          this._router.navigate(['/host/h/vehicles'])
          this._toastr.success('Vehicle Registered, after verification it would be display on your page') 
      },
      error: (err) => {
        console.log(err);
        this._toastr.error('Something went wrong');
        console.log('Something went wrong');
      }
    })
  }

}

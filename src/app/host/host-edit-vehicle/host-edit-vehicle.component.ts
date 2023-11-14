import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { vehicleState } from 'src/app/store/state/app.state';
import { HostService } from '../services/host.service';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription, map } from 'rxjs';
import { IVehicleModel } from 'src/app/models/vehicle.model';
import { retrievevehicles } from 'src/app/store/state/app.actions';
import { getvehicles } from 'src/app/store/state/app.selectors';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-host-edit-vehicle',
  templateUrl: './host-edit-vehicle.component.html',
  styleUrls: ['./host-edit-vehicle.component.css']
})
export class HostEditVehicleComponent implements OnInit, OnDestroy {

  vehicle!: IVehicleModel | undefined;
  vehicleForm!: FormGroup;
  transmission: string[] = ['Automatic', 'Manual'];
  fuel: string[] = ['Petrol', 'Diesel', 'Electric'];
  files: File[] = [];
  selectedFiles: File[] = []
  v_id!: string | null;
  private subscribe = new Subscription();

  constructor(
    private _activatedroute: ActivatedRoute,
    private _store: Store<vehicleState>,
    private _fb: FormBuilder,
    private _service: HostService,
    private _toastr: ToastrService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    
    // ---- for retrieving vehicle details ----
    this.update()
    // ----------------------------------------

    this.vehicleForm = this._fb.group({
      name: ['', Validators.required],
      brand: ['', [Validators.required, Validators.minLength(3)]],
      model: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      transmission: ['', Validators.required],
      fuel: ['', Validators.required],
      location: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
    })
  }

  update() {
    this.v_id = this._activatedroute.snapshot.paramMap.get('id')
    this.subscribe.add(
      this._service.getVehicleDetails(this.v_id).subscribe((res) => {
        this.vehicle = res
      })
    )
  }

  getImage(file: string) {
    return `${environment.STATIC_FILE_API}${file}`
  }

  deleteImage(v_id: string, file: string) {
    this.subscribe.add(
      this._service.deleteVehicleImage(file, v_id).subscribe({
        next: (res) => {
          console.log(res);
          this.update()
          this._toastr.success('Image deleted successfully !');
        },
        error: (err) => {
          if(err.status == 400) {
            this._toastr.error('Vehicle should have one image')
          } else { 
            this._toastr.error('Something went wrong');
          }
        }
      })
    )
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
      this.selectedFiles = event.target.files
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
    form.append('location', data.location);
    form.append('price', data.price);
    for (const file of this.selectedFiles) {
      form.append('files', file, file.name);
    }

    if (this.v_id) {
      this.subscribe.add(
        this._service.editVehicle(form, this.v_id).subscribe({
          next: () => {
            this._router.navigate(['/host/h/vehicles'])
            this._toastr.success('Vehicle Edited Successfully')
          },
          error: (err) => {
            this._toastr.error(err.error.message)
          }
        })
      )
    }
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }

}

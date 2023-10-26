import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription, map } from 'rxjs';
import { vehicleModel } from 'src/app/models/vehicle.model';
import { retrievevehicles } from 'src/app/store/state/app.actions';
import { getvehicles } from 'src/app/store/state/app.selectors';
import { vehicleState } from 'src/app/store/state/app.state';
import { environment } from 'src/environments/environment.development';
import { AdminService } from '../services/admin.services';

@Component({
  selector: 'app-admin-edit-vehicle',
  templateUrl: './admin-edit-vehicle.component.html',
  styleUrls: ['./admin-edit-vehicle.component.css']
})
export class AdminEditVehicleComponent implements OnInit, OnDestroy {

  vehicle!: Observable<vehicleModel | undefined>;
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
    private _service: AdminService,
    private _toastr: ToastrService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.v_id = this._activatedroute.snapshot.paramMap.get('id')
    this._store.dispatch(retrievevehicles())
    this.vehicle = this._store.pipe(
      select(getvehicles),
      map(v => v.find(vehicle => vehicle._id == this.v_id)))
    this.vehicleForm = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
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
    this._store.dispatch(retrievevehicles())
    this.vehicle = this._store.pipe(
      select(getvehicles),
      map(v => v.find(vehicle => vehicle._id == this.v_id)))
  }

  getImage(file: string) {
    return `${environment.STATIC_FILE_API}${file}`
  }

  deleteImage(id: string, file: string) {
    this.subscribe.add(
      this._service.deleteVehicleImage(file, id).subscribe({
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
            this._router.navigate(['/admin/a/vehicles'])
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

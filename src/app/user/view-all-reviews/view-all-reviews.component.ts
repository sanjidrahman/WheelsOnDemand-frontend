import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { IReviewModel, IVehicleModel } from '../../models/vehicle.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { NgConfirmService } from 'ng-confirm-box';
import { jwtDecode } from "jwt-decode";

@Component({
  selector: 'app-view-all-reviews',
  templateUrl: './view-all-reviews.component.html',
  styleUrls: ['./view-all-reviews.component.css']
})
export class ViewAllReviewsComponent implements OnInit, OnDestroy {

  rating!: number[]
  reviews!: IReviewModel[] | any
  vehicleDetails!: IVehicleModel | undefined
  v_id!: string | null
  userId!: string
  private subscribe = new Subscription()

  constructor(
    private _service: UserService,
    private _toastr: ToastrService,
    private _activatedroute: ActivatedRoute,
    private _ngConfirm: NgConfirmService,
  ){}

  ngOnInit(): void {
    this.updateData()

    const token = localStorage.getItem('userToken')
    if(token) {
      var decoded: any = jwtDecode(token)
    }
    this.userId = decoded.id
  }

  updateData() {
    this.v_id = this._activatedroute.snapshot.paramMap.get('v_id')

    this.subscribe.add(
      this._service.getVehicleDetails(this.v_id).subscribe((res: IVehicleModel) => {
        this.vehicleDetails = res
        this.reviews = res.review
      })
    )
  }


  getStarArray(rating: number): number[] {
    return Array(rating).fill(0).map((_, index) => index + 1);
  }

  getImage(file: string) {
    return `${environment.STATIC_FILE_API}${file}`
  }

  deleteReview(r_id: string) {
    this._ngConfirm.showConfirm('Are you sure to proceed the action', () => {
      this.subscribe.add(
        this._service.deleteReview(this.v_id, r_id).subscribe({
          next: () => {
            this.updateData()
            this._toastr.success('Review deleted successfully')
          },
          error: (err) => {
            this._toastr.error('Something went wrong', err.error.message)
          }
        })
      )
    }, () => {
      this._ngConfirm.closeConfirm()
    })
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }

}

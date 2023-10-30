import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';
declare var myFunction: any;

@Component({
  selector: 'app-booking-success',
  templateUrl: './booking-success.component.html',
  styleUrls: ['./booking-success.component.css']
})
export class BookingSuccessComponent implements OnInit {

  private subscribe = new Subscription()

  constructor(
    private _activatedroute: ActivatedRoute,
    private _service: UserService,
  ){}

  ngOnInit(): void {
    const bookingId = this._activatedroute.snapshot.paramMap.get('b_id');
    this.subscribe.add(
      this._service.getBookDetails(bookingId).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        }
      })
    )
  }

}

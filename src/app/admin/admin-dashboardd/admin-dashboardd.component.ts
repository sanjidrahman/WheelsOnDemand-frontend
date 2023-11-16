import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { IUserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-admin-dashboardd',
  templateUrl: './admin-dashboardd.component.html',
  styleUrls: ['./admin-dashboardd.component.css']
})
export class AdminDashboarddComponent implements OnInit {

  users! : IUserModel[]

  constructor(private _store : Store<{userlist: IUserModel[]}>) {}

  ngOnInit(): void {
    // this.store.dispatch(loaduser())
    // this.store.select(getuser).subscribe((res) => {
    //   this.users = res
    // })
  }

  listuser(){
   
  }

}

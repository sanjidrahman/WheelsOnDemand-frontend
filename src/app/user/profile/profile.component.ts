import jwt_decode from "jwt-decode";
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { userState } from 'src/app/store/state/app.state';
import { retrieveuser } from "src/app/store/state/app.actions";
import { getuser } from "src/app/store/state/app.selectors";
import { Observable, map } from "rxjs";
import { userModel } from "src/app/models/user.model";
import { environment } from "src/environments/environment.development";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  isHovered: boolean = false;
  userid: any
  userDetails!: Observable<userModel | undefined>

  constructor(
    private _store: Store<userState>,
  ){}

  ngOnInit(): void {
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

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const selectedFile = inputElement.files?.[0];
    if (selectedFile) {
      // Handle the selected file (e.g., upload it to the server)
      // You can add your logic to update the user's profile image.
    }
  }

  getImage(file: string) {
    return `${environment.STATIC_FILE_API}${file}`
  }

}

import { retrieveuser } from '../../store/state/app.actions';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, find, map } from 'rxjs';
import { retrievehost } from 'src/app/store/state/app.actions';
import { gethost } from 'src/app/store/state/app.selectors';
import { hostState } from 'src/app/store/state/app.state';
import { AdminService } from '../services/admin.services';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { SubmitNotverifiedComponent } from 'src/app/popups/submit-notverified/submit-notverified.component';
import { hostModel } from 'src/app/models/host.model';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-view-host-details',
  templateUrl: './view-host-details.component.html',
  styleUrls: ['./view-host-details.component.css']
})
export class ViewHostDetailsComponent implements OnInit {

  user!: Observable<hostModel | undefined>;
  img: any

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _store: Store<hostState>,
    private _service: AdminService,
    private _toastr: ToastrService,
    private _router: Router,
    private _dialog: MatDialog
  ) { }

  ngOnInit(): void {
    const id = this._activatedRoute.snapshot.paramMap.get('id')
    this._store.dispatch(retrievehost())
    this.user = this._store.pipe(
      select(gethost),
      map(item => item.find(data => data._id === id)));
  }

  getImage(img: string) {
    return `${environment.STATIC_FILE_API}${img}`
  }

  notVerifyHostPopup(id : string) {
    this._dialog.open(SubmitNotverifiedComponent, {
      width: '50%',
      maxHeight: '90vh',
      enterAnimationDuration : '300ms',
      exitAnimationDuration : '300ms',
      data : {
        id
      }
    })
  }

  verifyHost(id: string) {
    console.log(id);
    this._service.verifyhost(id).subscribe((res) => {
      console.log(res);
      this._router.navigate(['admin/a/hostlist'])
      this._toastr.success('Host verified Successfully');
    })
  }



}
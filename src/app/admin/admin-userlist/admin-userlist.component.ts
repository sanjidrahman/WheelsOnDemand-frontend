import { IUserModel } from '../../interfaces/user.model';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NgConfirmService } from 'ng-confirm-box';
import { Store, select } from '@ngrx/store';
import { retrieveuser } from 'src/app/store/state/app.actions';
import { getuser } from 'src/app/store/state/app.selectors';
import { userState } from 'src/app/store/state/app.state';
import { AdminService } from '../services/admin.services';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-admin-userlist',
  templateUrl: './admin-userlist.component.html',
  styleUrls: ['./admin-userlist.component.css']
})
export class AdminUserlistComponent implements AfterViewInit, OnInit {

  constructor(
    private _store: Store<userState>,
    private _ngConfirm: NgConfirmService,
    private _service: AdminService,
    private _toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this._store.dispatch(retrieveuser())
  }

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'hihihi'];
  dataSource = new MatTableDataSource<IUserModel>([]);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this._store.pipe(select(getuser)).subscribe((res) => {
      this.dataSource.data = res
    })
  }

  onblock(id: string) {
    this._ngConfirm.showConfirm('Are you sure you want to procees ?', () => {
      this._service.blockuser(id).subscribe((res) => {
        this._toastr.success('User blocked successfully !')
        this._store.dispatch(retrieveuser())
      }, (err) => {
        this._toastr.error('Something went wrong')
      })
    }, () => {
      this._ngConfirm.closeConfirm()
    })
  }

  onunblock(id: string) {
    this._service.unblockuser(id).subscribe((res) => {
      this._toastr.success('User unblocked successfully !')
      this._store.dispatch(retrieveuser())
    })
  }

  getImage(file: string) {
    return `${environment.STATIC_FILE_API}${file}`
  }


}


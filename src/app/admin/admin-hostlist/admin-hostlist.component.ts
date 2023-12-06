import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Store, select } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../services/admin.services';
import { NgConfirmService } from 'ng-confirm-box';
import { hostState } from 'src/app/store/state/app.state';
import { retrievehost } from 'src/app/store/state/app.actions';
import { gethost } from 'src/app/store/state/app.selectors';
import { IHostModel } from 'src/app/interfaces/host.model';
import { environment } from 'src/environments/environment.development';


@Component({
  selector: 'app-admin-hostlist',
  templateUrl: './admin-hostlist.component.html',
  styleUrls: ['./admin-hostlist.component.css']
})
export class AdminHostlistComponent implements OnInit, AfterViewInit {

  constructor(
    private _store : Store<hostState>,
    private _toastr : ToastrService,
    private _service : AdminService,
    private _ngConfirm : NgConfirmService
  ) {}

  displayedColumns: string[] = ['image', 'name', 'email', 'phone' ,'verified' , 'showdetails' ,'actions'];
  dataSource = new MatTableDataSource<IHostModel>([]);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngOnInit(): void {
    this._store.dispatch(retrievehost())
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this._store.pipe(select(gethost)).subscribe((res) => {
      this.dataSource.data = res
    })
  }

  onblock(id: string) {
    this._ngConfirm.showConfirm('Are you sure you want to procees ?', () => {
      this._service.blockhost(id).subscribe(() => {
        this._toastr.success('Partner blocked successfully !')
        this._store.dispatch(retrievehost())
      }, (err) => {
        this._toastr.error('Something went wrong')
      })
    }, () => {
      this._ngConfirm.closeConfirm()
    })
  }

  onunblock(id: string) {
    this._service.unblockhost(id).subscribe(() => {
      this._store.dispatch(retrievehost())
      this._toastr.success('Partner unblocked successfully!')
    })
  }

  getImage(file: string) {
    return `${environment.STATIC_FILE_API}${file}`
  }

}

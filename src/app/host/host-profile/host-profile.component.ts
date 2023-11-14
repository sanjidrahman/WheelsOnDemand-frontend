import { hostState } from './../../store/state/app.state';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { HostService } from '../services/host.service';
import { IHostModel } from 'src/app/models/host.model';
import { environment } from 'src/environments/environment.development';
import { MatDialog } from '@angular/material/dialog';
import { EditHostDialogComponent } from 'src/app/popups/edit-host-dialog/edit-host-dialog.component';
import { ChangePassComponent } from 'src/app/popups/change-pass/change-pass.component';
import { Store } from '@ngrx/store';
import { retrievehost } from 'src/app/store/state/app.actions';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-host-profile',
  templateUrl: './host-profile.component.html',
  styleUrls: ['./host-profile.component.css']
})
export class HostProfileComponent implements OnInit {

  hostDetails!: IHostModel;
  file!: File | null
  isHidden = false

  constructor(
    private _service: HostService,
    private _matdialog: MatDialog,
    private _toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this._service.hostdetails().subscribe((res) => {
      this.hostDetails = res
    })
  }

  update() {
    this._service.hostdetails().subscribe((res) => {
      this.hostDetails = res
    })
  }

  openeditpopup() {
    const dialogRef = this._matdialog.open(EditHostDialogComponent, {
      data: this.hostDetails,
      width: '40%',
    });
    dialogRef.afterClosed().subscribe(() => {
      this.update()
    })
  }

  getImage(img: string) {
    return `${environment.STATIC_FILE_API}${img}`
  }

  openChangePass() {
    const passDialogRef = this._matdialog.open(ChangePassComponent, {
      data: this.hostDetails,
      width: '40%'
    })
    passDialogRef.afterClosed().subscribe(() => {
      this.update()
    })
  }

  onFileInput(event: any) {
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    this.file = <File>event.target.files[0];

    if (this.file) {
      const fileExtension = this.getFileExtension(this.file.name);

      if (!allowedExtensions.includes(fileExtension)) {
        this.file = null;
        alert('Please select a valid image file (jpg, jpeg, png, or gif).');
      }
    }
  }
  getFileExtension(filename: string): any {
    return filename.split('.').pop();
  }

  onUpload() {
    if(this.file) {
      const form = new FormData()
      form.append('file', this.file, this.file.name)
      this._service.uploadProfile(form).subscribe(() => {
        this._toastr.success('Profile updated!')
        this.file = null
        this.update()
      }, (err) => {
        this._toastr.error('Something went wrong')
      })
    }
  }


}

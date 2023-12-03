import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { HostService } from '../services/host.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";

@Component({
  selector: 'app-host-upload-doc',
  templateUrl: './host-upload-doc.component.html',
  styleUrls: ['./host-upload-doc.component.css']
})
export class HostUploadDocComponent {

  status: "initial" | "uploading" | "success" | "fail" = "initial"; // Variable to store file status
  file!: File
  jwttoken!: any

  constructor(
    private _service: HostService,
    private _toastr: ToastrService,
    private _router: Router
  ) { }

  uploadFile(event: any) {
    this.file = <File>event.target.files[0]
    if (this.file) {
      this.status = "initial"
    }
  }


  onUpload() {
    if (this.file) {
      const form = new FormData()
      form.append('file', this.file, this.file.name)
      const token = localStorage.getItem('hostToken')
      if (token) this.jwttoken = jwtDecode(token)
      const upload$ = this._service.upload(form , this.jwttoken.id)
      this.status = "uploading"
      upload$.subscribe({
        next: () => {
          this.status = "success"
          localStorage.removeItem('hostToken')
          this._router.navigate(['/host/host-upload-success'])
          this._toastr.success('Document uploaded successfully!')
        },
        error: (err: any) => {
          this._toastr.error(err.error.message)
          this.status = "fail"
        }
      })
    }
  }

}

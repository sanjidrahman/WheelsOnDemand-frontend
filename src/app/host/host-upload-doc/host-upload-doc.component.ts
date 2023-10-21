import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { HostService } from '../services/host.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-host-upload-doc',
  templateUrl: './host-upload-doc.component.html',
  styleUrls: ['./host-upload-doc.component.css']
})
export class HostUploadDocComponent implements OnInit{

  status: "initial" | "uploading" | "success" | "fail" = "initial"; // Variable to store file status
  file!: File
  jwttoken!: any
  fileinput!: FormGroup

  constructor(
    private _service: HostService,
    private _toastr: ToastrService,
    private _fb: FormBuilder,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.fileinput = this._fb.group({
      file:['', RxwebValidators.extension({extensions:['png','jpg','jpeg','gif']})]
    })
  }

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
      if (token) {
        this.jwttoken = jwt_decode(token)
      }
      const upload$ = this._service.upload(form , this.jwttoken.id)
      this.status = "uploading"
      upload$.subscribe({
        next: () => {
          this.status = "success"
          this._router.navigate(['/host/host-upload-success'])
          this._toastr.success('Document uploaded successfully!')
        },
        error: (err: any) => {
          console.log(err);
          this._toastr.error(err.error.message)
          this.status = "fail"
        }
      })
    }
  }

  hi(){
    console.log(this.fileinput.value);
  }

}

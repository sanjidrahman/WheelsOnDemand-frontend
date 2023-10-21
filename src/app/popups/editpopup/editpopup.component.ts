import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-editpopup',
  templateUrl: './editpopup.component.html',
  styleUrls: ['./editpopup.component.css']
})
export class EditpopupComponent implements OnInit {
  user: any;
  dialogdata! : any;

  constructor(@Inject(MAT_DIALOG_DATA) private data : any , private ref : MatDialogRef<EditpopupComponent>) {}

  ngOnInit(): void {
    this.dialogdata = this.data
  }


  saveClick() {
   this.ref.close('kinjapy')
  }

}

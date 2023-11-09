import { NgModule } from '@angular/core';
import { CapitalizePipePipe } from '../host/pipe/capitalize-pipe.pipe';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ CapitalizePipePipe ],
  imports: [ CommonModule ],
  exports: [ CapitalizePipePipe ]
})
export class SharedModule { }

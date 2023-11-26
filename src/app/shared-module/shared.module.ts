import { NgModule } from '@angular/core';
import { CapitalizePipePipe } from '../host/pipe/capitalize-pipe.pipe';
import { CommonModule } from '@angular/common';
import { SearchFilterPipe } from '../host/pipe/search-filter.pipe';
import { PriceCalculationPipe } from '../host/pipe/price-calculation.pipe';

@NgModule({
  declarations: [CapitalizePipePipe, SearchFilterPipe, PriceCalculationPipe],
  imports: [CommonModule],
  exports: [CapitalizePipePipe, SearchFilterPipe, PriceCalculationPipe],
})
export class SharedModule {}

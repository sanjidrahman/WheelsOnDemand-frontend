import { Pipe, PipeTransform } from '@angular/core';
import { IVehicleModel } from '../../models/vehicle.model';

@Pipe({
  name: 'searchFilterPipe',
})
export class SearchFilterPipe implements PipeTransform {

  transform(value: IVehicleModel[], args?: any): IVehicleModel[] {
    if (!args) return value

    args = args.toLowerCase()
    return value.filter((item: any) => {
      return JSON.stringify(item)
      .toLowerCase()
      .includes(args)
    })
  }
}

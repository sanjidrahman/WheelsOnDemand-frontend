import { Pipe, PipeTransform } from '@angular/core';
import { vehicleModel } from 'src/app/models/vehicle.model';

@Pipe({
  name: 'pricecalculation'
})
export class PriceCalculationPipe implements PipeTransform {

  transform(vehicleList: vehicleModel[], days: number): any[] {
    const second = new Date()
    if(!Array.isArray(vehicleList)) {
        console.log(second.getSeconds());
        console.log('IN or OUT');
        return vehicleList
    }
    
       return vehicleList.map((v) => {
        console.log(v , 'AAA');
        if (days >= 7) {
          const dis = (v.price * days * 10) / 100;
          console.log(v.price , dis, 'DIS');
          v.price = v.price * days - dis;
          console.log(v.price);
        } else {
          v.price = v.price * days;
        }
        return v;
      });
    }
}

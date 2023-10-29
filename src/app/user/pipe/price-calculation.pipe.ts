// import { Pipe, PipeTransform } from '@angular/core';

// @Pipe({
//   name: 'pricecalculation'
// })
// export class PriceCalculationPipe implements PipeTransform {

//   transform(vehicleList: any[], days: number): any[] {
//     const customPrice : number[] = []
//     console.log(vehicleList, days);
//     if (!vehicleList || !Array.isArray(vehicleList) || isNaN(days)) {
//       return vehicleList;
//     }

//     return vehicleList.forEach((v) => {
//       if (days >= 7) {
//         const dis = (v.price * days) * 10 / 100
//         const price = (v.price * days) - dis
//         return customPrice.push(price)
//       } else {
//         v.customPrice = v.price * days;
//       }
//     });
//   }
// }

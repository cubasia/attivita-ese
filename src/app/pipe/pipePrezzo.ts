import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'pricePipe' })
export class pricePipe implements PipeTransform {
  transform(price: number): string {
    if (price === 0) {
      return 'gratis';
    } else if (price >= 0.1 && price <= 0.5) {
      return 'basso';
    } else if (price > 0.5 && price < 1) {
      return 'medio';
    } else if (price === 1) {
      return 'alto';
    } else {
      return 'medio';
    }
  }
}

import { Pipe, PipeTransform } from '@angular/core';
import { mkdirSync } from 'fs';

@Pipe({
  name: 'order',
  pure: true
})
export class OrderPipe implements PipeTransform {

  transform(items: any, propName: string): any {
    const sortedArray = items.slice();
    sortedArray.sort(function(a, b) {
      var valueA = a[propName].toUpperCase(); // ignore upper and lowercase
      var valueB = b[propName].toUpperCase(); // ignore upper and lowercase
      if (valueA < valueB) {
        return -1;
      }
      if (valueA > valueB) {
        return 1;
      }
    
      // names must be equal
      return 0;
    });

    return sortedArray;

  }

}

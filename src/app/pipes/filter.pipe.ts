import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], field: string, value: string): any[] {

    console.log(items)
    console.log(field)
    console.log(value)

    if (!items) {
      return [];
    }

    if (!value || value === "") {
      return items;
    }

    const myPattern = new RegExp(value, 'i');
    return items.filter(it => it[field].match(myPattern));
  }
}
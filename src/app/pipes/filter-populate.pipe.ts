import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPopulate'
})
export class FilterPopulatePipe implements PipeTransform {

  transform(items: any[], parentField: string, childField: string, value: string): any[] {

    if (!items) {
      return [];
    }

    if (!value || value === "") {
      return items;
    }

    const myPattern = new RegExp(value, 'i');
    return items.filter(it => it[parentField][childField].match(myPattern));
  }
}

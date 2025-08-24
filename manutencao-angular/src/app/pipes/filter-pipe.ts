import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], searchText: string, dateField?: string, selectedDate?: Date): any[] {
    if (!items) return [];
    if (!searchText && !selectedDate) return items;

    searchText = searchText ? searchText.toLowerCase() : '';

    return items.filter(item => {
      let matchesText = true;
      let matchesDate = true;

      if(searchText) {
        matchesText = Object.values(item).some(value =>
          String(value).toLowerCase().includes(searchText)
        )
      }

      //fazer filtro de data

      return matchesText;
    })
  }
}

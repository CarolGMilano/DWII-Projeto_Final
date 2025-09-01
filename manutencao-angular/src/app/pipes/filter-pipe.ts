import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], searchText: string, dateField: string = 'data', selectedDate?: Date): any[] {
    if (!items) return [];

    const hasDate = !!selectedDate;

    if (!searchText && !hasDate) return items;

    searchText = searchText ? searchText.toLowerCase() : '';
    
    return items.filter(item => {
      let matchesText = true;
      let matchesDate = true;

      if(searchText) {
        matchesText = Object.values(item).some(value =>
          String(value).toLowerCase().includes(searchText)
        )
      }

      if(hasDate) {
        const itemDate = new Date(item?.[dateField]);

        if (isNaN(itemDate.getTime())) return false;

        const sameDay = 
          itemDate.getFullYear === selectedDate.getFullYear &&
          itemDate.getMonth === selectedDate.getMonth &&
          itemDate.getDate === selectedDate.getDate;

        matchesDate = sameDay
      }

      return matchesText && matchesDate;
    });
  }
}

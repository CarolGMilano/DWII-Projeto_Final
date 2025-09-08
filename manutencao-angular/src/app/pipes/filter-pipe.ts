import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], searchText: string, dateField: string = 'data', selectedDate?: string | Date): any[] {
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
        let filterDate: Date;

        if (typeof selectedDate === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(selectedDate)) {
          const [y, m, d] = selectedDate.split('-').map(Number);
          filterDate = new Date(y, m - 1, d); 
        } else {
          filterDate = new Date(selectedDate as any);
        }
        
        const itemDate = new Date(item?.[dateField]);

        if (isNaN(itemDate.getTime())) return false;

        const sameDay = 
          itemDate.getFullYear() === filterDate.getFullYear() &&
          itemDate.getMonth() === filterDate.getMonth() &&
          itemDate.getDate() === filterDate.getDate();

        matchesDate = sameDay;
      }

      return matchesText && matchesDate;
    });
  }
}

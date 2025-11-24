import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})

export class FilterPipe implements PipeTransform {

  private normalize(dateInput: any): Date {
    if (!dateInput) return new Date(NaN);

    if (typeof dateInput === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(dateInput)) {
      const [y, m, d] = dateInput.split('-').map(Number);
      return new Date(y, m - 1, d);
    }

    if (typeof dateInput === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(dateInput)) {
      const [y, m, d] = dateInput.substring(0, 10).split('-').map(Number);
      return new Date(y, m - 1, d);
    }

    const d = new Date(dateInput);
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }


  transform(
    items: any[],
    searchText: string,
    dateField = 'dataAbertura',
    selectedDate?: string | Date,
    selectedOrder: 'desc' | 'asc' = 'asc',
    startDate?: string | Date,
    endDate?: string | Date
  ): any[] {
    if (!items) return [];

    const hasDate = !!selectedDate;
    const hasRange = !!startDate && !!endDate;

    if (!searchText && !hasDate && !hasRange && !selectedOrder) return items;

    searchText = searchText ? searchText.toLowerCase() : '';

    let filtered = items.filter(item => {
      let matchesText = true;
      let matchesDate = true;

      if (searchText) {
        matchesText = Object.values(item).some(value =>
          String(value).toLowerCase().includes(searchText)
        )
      }

      if (hasDate) {
        const filterDate = this.normalize(selectedDate);
        const rawItemDate = new Date(item?.[dateField]);

        if (isNaN(rawItemDate.getTime())) return false;

        const itemDate = this.normalize(rawItemDate);

        matchesDate =
          itemDate.getTime() === filterDate.getTime();
      }

      if (hasRange) {
        const start = this.normalize(startDate);
        const end = this.normalize(endDate);
        const rawItemDate = new Date(item?.[dateField]);

        if (isNaN(rawItemDate.getTime())) return false;

        const itemDate = this.normalize(rawItemDate);

        matchesDate = itemDate >= start && itemDate <= end;
      }

      return matchesText && matchesDate;

    });

    if (dateField) {
      filtered = filtered.sort((a, b) => {
        const dA = new Date(a[dateField]).getTime();
        const dB = new Date(b[dateField]).getTime();

        const dateA = this.normalize(dA).getTime();
        const dateB = this.normalize(dB).getTime();

        return selectedOrder === 'asc' ? dateA - dateB : dateB - dateA;
      });
    }

    return filtered;
  }
}

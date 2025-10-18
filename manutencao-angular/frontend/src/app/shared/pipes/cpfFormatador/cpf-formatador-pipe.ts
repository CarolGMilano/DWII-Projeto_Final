import { Pipe, PipeTransform } from '@angular/core';

import { mascaraCPF } from '../../utils'

@Pipe({
  name: 'cpfFormatador',
  standalone: false
})
export class CpfFormatadorPipe implements PipeTransform {

  transform(value: string | undefined): string {
    if (value) {
      return mascaraCPF(value);
    } else {
      return '';
    } 
  }
}

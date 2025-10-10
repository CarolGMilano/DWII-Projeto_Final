import { Pipe, PipeTransform } from '@angular/core';

import { mascaraTelefone } from '../../utils';

@Pipe({
  name: 'telefoneFormatador',
  standalone: false
})
export class TelefoneFormatadorPipe implements PipeTransform {

  transform(value: string | undefined): string {
    if (value) {
      return mascaraTelefone(value);
    } else {
      return '';
    } 
  }
}

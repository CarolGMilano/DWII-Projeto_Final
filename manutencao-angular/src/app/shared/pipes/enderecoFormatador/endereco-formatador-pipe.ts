import { Pipe, PipeTransform } from '@angular/core';

import { Endereco } from '../../models';
import { mascaraCEP } from '../../utils';

@Pipe({
  name: 'enderecoFormatador',
  standalone: false
})
export class EnderecoFormatadorPipe implements PipeTransform {

  transform(endereco: Endereco): string {
    if(endereco){
      const logradouro = endereco.logradouro ?? '';
      const bairro = endereco.bairro ?? '';
      const cidade = endereco.cidade ?? '';
      const estado = endereco.estado ?? '';
      const numero = endereco.numero ? `, ${endereco.numero}` : '';
      const cepFormatado = endereco.cep ? ` - CEP: ${mascaraCEP(String(endereco.cep))}` : '';

      return `${logradouro}${numero} - ${bairro}, ${cidade}/${estado}${cepFormatado}`;
    } else {
      return '';
    }
  }
}
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'moedaBr' })

export class MoedaBrPipe implements PipeTransform {
  
  transform(value: number | string): string {
    if (value === null || value === undefined) return '';
    const num = typeof value === 'string' ? parseFloat(value.replace(/\D/g, '')) / 100 : value;
    return num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }
}
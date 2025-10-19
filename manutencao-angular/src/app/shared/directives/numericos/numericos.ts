import { Directive, HostListener, ElementRef, inject, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { removerNaoNumericos, mascaraCPF, mascaraTelefone, mascaraCEP } from '../../utils/index'

@Directive({
  selector: '[numericos]',
  standalone: false,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: Numericos,
    multi: true
  }]
})
export class Numericos implements ControlValueAccessor {
  //Qual o tipo de entrada
  @Input('numericos') tipo: 'cpf' | 'cnpj' | 'telefone' | 'cep' | '' = '';

  private elemento = inject(ElementRef);

  onChange: any = () => {};
  onTouched: any = () => {};

  constructor() { }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(valor: any): void {
    //Se tiver algo no input, adiciona a máscara correspondente
    if (valor) {
      this.elemento.nativeElement.value = this.aplicarMascara(valor);
    } else {
      this.elemento.nativeElement.value = '';
    }
  }

  //Qualquer alteração no input que possue a diretiva
  @HostListener('input', ['$event'])
  onInput(event: any): void {
    const valorNumerico = removerNaoNumericos(event.target.value);
    const valorMascarado = this.aplicarMascara(valorNumerico);

    //No input aparece a máscara
    event.target.value = valorMascarado;

    //Para enviar, envia apenas os números
    this.onChange(valorNumerico); 
  }

  //Quando entra e sai do campo
  @HostListener('blur')
  onBlur() {
    this.onTouched(); 
  }

  private aplicarMascara(valor: string): string {
    switch (this.tipo) {
      case 'cpf': return mascaraCPF(valor);
      case 'telefone': return mascaraTelefone(valor);
      case 'cep': return mascaraCEP(valor);
      default: return valor;
    }
  }
}

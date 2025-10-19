import { Directive } from '@angular/core';
import { FormControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[CpfValidator]',
  standalone: false,
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: CpfValidator,
    multi: true
  }]
})
export class CpfValidator implements Validator {

  constructor() { }

  validate(control: FormControl): ValidationErrors | null {
    const cpf: string = control.value;

    if (!cpf) {
      return { required: true }; //Caso o campo esteja vazio
    }

    if (cpf.length !== 11) {
      return { cpfIncompleto: true }; //CPF inválido
    }

    return null;
  }
}

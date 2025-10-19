import { Directive } from '@angular/core';
import { FormControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[CepValidator]',
  standalone: false,
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: CepValidator,
    multi: true
  }]
})
export class CepValidator {

  constructor() { }

  validate(control: FormControl): ValidationErrors | null {
    const cep: string = control.value;

    if (!cep) {
      return { vazio: true };
    }

    if (cep.length !== 8) {
      return { incompleto: true };
    }

    return null;
  }

}

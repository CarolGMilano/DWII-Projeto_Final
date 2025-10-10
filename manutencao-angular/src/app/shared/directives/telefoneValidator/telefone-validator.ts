import { Directive } from '@angular/core';
import { FormControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[TelefoneValidator]',
  standalone: false,
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: TelefoneValidator,
    multi: true
  }]
})
export class TelefoneValidator implements Validator {

  constructor() { }

  validate(control: FormControl): ValidationErrors | null {
    const telefone: string = control.value;

    if (!telefone) {
      return { vazio: true };
    }

    if (telefone.length !== 11) {
      return { telefoneIncompleto: true };
    }

    return null;
  }

}

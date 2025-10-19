import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Numericos, CpfValidator, TelefoneValidator, CepValidator } from './directives';
import { CpfFormatadorPipe, TelefoneFormatadorPipe, EnderecoFormatadorPipe } from './pipes';

@NgModule({
  declarations: [
    Numericos,

    CpfValidator,
    TelefoneValidator,
    CepValidator,

    CpfFormatadorPipe,
    TelefoneFormatadorPipe,
    EnderecoFormatadorPipe
  ],
  exports: [
    Numericos,

    CpfValidator,
    TelefoneValidator,
    CepValidator,

    CpfFormatadorPipe,
    TelefoneFormatadorPipe,
    EnderecoFormatadorPipe
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
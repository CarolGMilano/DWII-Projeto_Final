import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-voltar-tela',
  imports: [MatIconModule],
  templateUrl: './voltar-tela.html',
  styleUrl: './voltar-tela.css'
})
export class VoltarTela {
  constructor(private location: Location) {}

  voltar() {
    this.location.back();
  }
}

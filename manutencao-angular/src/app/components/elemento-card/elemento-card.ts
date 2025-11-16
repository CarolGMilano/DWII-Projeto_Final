import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-elemento-card',
  imports: [CommonModule],
  templateUrl: './elemento-card.html',
  styleUrl: './elemento-card.css'
})
export class ElementoCard {
  @Input() mensagem: string = 'Operação realizada com sucesso!';
  @Input() cor: string = '#B6CEB4';
  
  mostrar: boolean = false;

  //Pra ele só redirecionar quando terminar o tempo.
  exibir(tempo = 4000, callback?: () => void) {
    this.mostrar = true;
    
    setTimeout(() => {
      this.mostrar = false;

      if (callback) callback();
    }, tempo);
  }
}

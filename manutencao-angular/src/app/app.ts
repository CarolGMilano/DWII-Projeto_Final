import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NovaSolicitacao } from './nova-solicitacao/nova-solicitacao';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NovaSolicitacao],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('manutencao-angular');
}

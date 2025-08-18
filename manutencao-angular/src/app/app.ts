import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NovaSolicitacao } from './nova-solicitacao/nova-solicitacao';
import { VisualizarOrcamento } from "./visualizar-orcamento/visualizar-orcamento";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule, ReactiveFormsModule, VisualizarOrcamento],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('manutencao-angular');
}

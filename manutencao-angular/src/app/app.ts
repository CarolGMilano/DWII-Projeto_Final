import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Menu } from './components/menu/menu';
import { NovaSolicitacao } from './components/nova-solicitacao/nova-solicitacao';
import { Submenu } from './components/submenu/submenu';
import { TelaInicialCliente } from './components/tela-inicial-cliente/tela-inicial-cliente';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet, 
    Menu, 
    Submenu, 
    NovaSolicitacao, 
    TelaInicialCliente
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('manutencao-angular');
}

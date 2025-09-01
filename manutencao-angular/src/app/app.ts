import { Component, signal} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Menu } from './components/menu/menu';
import { NovaSolicitacao } from './components/nova-solicitacao/nova-solicitacao';
import { Submenu } from './components/submenu/submenu';
import { TelaInicialCliente } from './components/tela-inicial-cliente/tela-inicial-cliente';
import { VisualizarOrcamento } from "./components/visualizar-orcamento/visualizar-orcamento";
import { VisualizarServico } from "./components/visualizar-servico/visualizar-servico";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Menu,
    Submenu,
    NovaSolicitacao,
    TelaInicialCliente,
    VisualizarOrcamento,
    VisualizarServico
],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('manutencao-angular');
}

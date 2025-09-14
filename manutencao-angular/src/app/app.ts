import { Component, signal} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Menu } from './components/menu/menu';
import { NovaSolicitacao } from './components/nova-solicitacao/nova-solicitacao';
import { Submenu } from './components/submenu/submenu';
import { TelaInicialCliente } from './components/tela-inicial-cliente/tela-inicial-cliente';
import { VisualizarOrcamento } from "./components/visualizar-orcamento/visualizar-orcamento";
import { PagarServico } from "./components/pagar-servico/pagar-servico";
import { VisualizarServico } from "./components/visualizar-servico/visualizar-servico";
import { TelaFuncionarios } from "./pages";
import { TelaCategorias } from "./pages/tela-categorias/tela-categorias";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Menu,
    Submenu,
    NovaSolicitacao,
    TelaInicialCliente,
    VisualizarOrcamento,
    PagarServico,
    VisualizarServico,
    RouterModule,
    TelaFuncionarios,
    TelaCategorias
],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('manutencao-angular');
}

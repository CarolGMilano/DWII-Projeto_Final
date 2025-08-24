import { Routes } from '@angular/router';
import { TelaCadastro } from './components/tela-cadastro/tela-cadastro.component';
import { TelaInicialCliente } from './components/tela-inicial-cliente/tela-inicial-cliente';
import { NovaSolicitacao } from './components/nova-solicitacao/nova-solicitacao';
import { VisualizarServico } from './components/visualizar-servico/visualizar-servico';
import { VisualizarOrcamento } from './components/visualizar-orcamento/visualizar-orcamento';

export const routes: Routes = [
    { path: "cadastro", component: TelaCadastro },
    { path: 'tela-inicial-cliente', component: TelaInicialCliente },
    { path: 'nova-solicitacao', component: NovaSolicitacao },
    { path: 'visualizar-servico/:id', component: VisualizarServico },
    { path: 'visualizar-orcamento/:id', component: VisualizarOrcamento }

];
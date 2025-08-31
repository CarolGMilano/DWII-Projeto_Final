import { Routes } from '@angular/router';
import { TelaCadastro } from './components/tela-cadastro/tela-cadastro.component';
import { TelaInicialCliente } from './components/tela-inicial-cliente/tela-inicial-cliente';
import { NovaSolicitacao } from './components/nova-solicitacao/nova-solicitacao';
import { VisualizarOrcamento } from './components/visualizar-orcamento/visualizar-orcamento';
import { PagarServico } from './components/pagar-servico/pagar-servico';

export const routes: Routes = [
    { path: "cadastro", component: TelaCadastro },
    { path: 'tela-inicial-cliente', component: TelaInicialCliente },
    { path: 'nova-solicitacao', component: NovaSolicitacao },
    { path: 'visualizar-orcamento/:id', component: VisualizarOrcamento},
    { path: 'pagar-servico/:id', component: PagarServico}

];
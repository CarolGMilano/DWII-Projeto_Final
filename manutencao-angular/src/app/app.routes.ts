import { Routes } from '@angular/router';
import { TelaCadastro } from './components/tela-cadastro/tela-cadastro.component';
import { TelaInicialCliente } from './components/tela-inicial-cliente/tela-inicial-cliente';
import { NovaSolicitacao } from './components/nova-solicitacao/nova-solicitacao';

export const routes: Routes = [
    { path: "cadastro", component: TelaCadastro },
    { path: 'tela-inicial-cliente', component: TelaInicialCliente },
    { path: 'nova-solicitacao', component: NovaSolicitacao },
];
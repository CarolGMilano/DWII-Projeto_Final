import { Routes } from '@angular/router';
import { TelaInicialCliente } from './tela-inicial-cliente/tela-inicial-cliente';
import { NovaSolicitacao } from './nova-solicitacao/nova-solicitacao';

export const routes: Routes = [
    { path: 'tela-inicial-cliente', component: TelaInicialCliente },
    { path: 'nova-solicitacao', component: NovaSolicitacao },
];

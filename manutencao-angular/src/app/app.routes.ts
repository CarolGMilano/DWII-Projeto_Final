import { Routes } from '@angular/router';
import { TelaCadastro, TelaLogin } from './pages/index';
import { TelaInicialCliente } from './components/tela-inicial-cliente/tela-inicial-cliente';
import { NovaSolicitacao } from './components/nova-solicitacao/nova-solicitacao';

export const routes: Routes = [
    { path: '', component: TelaLogin },
    { path: 'cadastro', component: TelaCadastro },
    { path: 'tela-inicial-cliente', component: TelaInicialCliente },
    { path: 'nova-solicitacao', component: NovaSolicitacao },
];
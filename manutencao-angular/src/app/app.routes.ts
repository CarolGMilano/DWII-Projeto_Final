import { Routes } from '@angular/router';
import { TelaCadastro, TelaLogin, TelaFuncionarios, GerarRelatorio, TelaVisualizarDetalhes, TelaHistorico } from './pages/index';
import { TelaInicialCliente } from './pages/tela-inicial-cliente/tela-inicial-cliente';
import { TelaInicialFuncionario } from './pages/tela-inicial-funcionario/tela-inicial-funcionario';
import { NovaSolicitacao } from './components/nova-solicitacao/nova-solicitacao';
import { VisualizarOrcamento } from './components/visualizar-orcamento/visualizar-orcamento';
import { PagarServico } from './components/pagar-servico/pagar-servico';
import { VisualizarServico } from './components/visualizar-servico/visualizar-servico';
import { TelaCategorias } from './pages/tela-categorias/tela-categorias';
import { ClienteFuncionarioLayout } from './layout';
import { TelaListaSolicitacoes } from './pages/tela-lista-solicitacoes/tela-lista-solicitacoes';
import { RealizarOrcamento } from './components/realizar-orcamento/realizar-orcamento';

export const routes: Routes = [
  { path: '', component: TelaLogin, pathMatch: 'full'},
  { path: 'cadastro', component: TelaCadastro },
  
  {
    path: '',
    component: ClienteFuncionarioLayout,
    children: [
      { path: 'tela-inicial-cliente', component: TelaInicialCliente },
      { path: 'historico-solicitacoes', component: TelaHistorico },
      { path: 'nova-solicitacao', component: NovaSolicitacao },
      { path: 'visualizar-orcamento/:id', component: VisualizarOrcamento},
      { path: 'visualizar-servico/:id', component: VisualizarServico},
      { path: 'pagar-servico/:id', component: PagarServico},

      { path: 'tela-inicial-funcionario', component: TelaInicialFuncionario },
      { path: 'tela-lista-solicitacoes', component: TelaListaSolicitacoes },
      { path: 'realizar-orcamento/:id', component: RealizarOrcamento },
      { path: 'funcionarios', component: TelaFuncionarios },
      { path: 'tela-categorias', component: TelaCategorias },
      { path: 'visualizar-detalhes/:id', component: TelaVisualizarDetalhes },
      { path: 'gerar-relatorio', component: GerarRelatorio },
    ]
  },

  //Rota coringa: Se tentar acessar alguma rota que não exista, redireciona para a raiz.
  { path: '**', redirectTo: '' }
];
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
import { authGuard } from './auth/auth-guard';
import { TipoUsuario } from './shared';

export const routes: Routes = [
  { path: '', component: TelaLogin, pathMatch: 'full'},
  { path: 'cadastro', component: TelaCadastro },
  
  {
    path: '',
    component: ClienteFuncionarioLayout,
    children: [
      { 
        path: 'tela-inicial-cliente', 
        component: TelaInicialCliente,
        canActivate: [authGuard],
        data: {
          role: [ TipoUsuario.CLIENTE ]
        }
      },
      { 
        path: 'historico-solicitacoes', 
        component: TelaHistorico, 
        canActivate: [authGuard],
        data: {
          role: [ TipoUsuario.CLIENTE ]
        }
      },
      { 
        path: 'nova-solicitacao', 
        component: NovaSolicitacao,  
        canActivate: [authGuard],
        data: {
          role: [ TipoUsuario.CLIENTE ]
        }
      },
      { 
        path: 'visualizar-orcamento/:id', 
        component: VisualizarOrcamento,
        canActivate: [authGuard],
        data: {
          role: [ TipoUsuario.CLIENTE ]
        }
      },
      { 
        path: 'visualizar-servico/:id', 
        component: VisualizarServico,
        canActivate: [authGuard],
        data: {
          role: [ TipoUsuario.CLIENTE ]
        }
      },
      { 
        path: 'pagar-servico/:id', 
        component: PagarServico,
        canActivate: [authGuard],
        data: {
          role: [ TipoUsuario.CLIENTE ]
        }
      },

      { 
        path: 'tela-inicial-funcionario', 
        component: TelaInicialFuncionario, 
        canActivate: [authGuard],
        data: {
          role: [ TipoUsuario.FUNCIONARIO ]
        }
      },
      { 
        path: 'tela-lista-solicitacoes', 
        component: TelaListaSolicitacoes, 
        canActivate: [authGuard],
        data: {
          role: [ TipoUsuario.FUNCIONARIO ]
        }
      },
      { 
        path: 'realizar-orcamento/:id', 
        component: RealizarOrcamento, 
        canActivate: [authGuard],
        data: {
          role: [ TipoUsuario.FUNCIONARIO ]
        }
      },
      { 
        path: 'funcionarios', 
        component: TelaFuncionarios, 
        canActivate: [authGuard],
        data: {
          role: [ TipoUsuario.FUNCIONARIO ]
        }
      },
      { 
        path: 'tela-categorias', 
        component: TelaCategorias, 
        canActivate: [authGuard],
        data: {
          role: [ TipoUsuario.FUNCIONARIO ]
        }
      },
      { 
        path: 'solicitacoes/:id/detalhes', 
        component: TelaVisualizarDetalhes, 
        canActivate: [authGuard],
        data: {
          role: [ TipoUsuario.FUNCIONARIO ]
        }
      },
      { 
        path: 'gerar-relatorio', 
        component: GerarRelatorio, 
        canActivate: [authGuard],
        data: {
          role: [ TipoUsuario.FUNCIONARIO ]
        }
      },
    ]
  },

  //Rota coringa: Se tentar acessar alguma rota que não exista, redireciona para a raiz.
  { path: '**', redirectTo: '' }
];
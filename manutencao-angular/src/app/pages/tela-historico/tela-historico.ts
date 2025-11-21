import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule, Solicitacao, SolicitacaoResumo, StatusSolicitacao, StatusSolicitacaoCor, StatusSolicitacaoLabel } from '../../shared';
import { ClienteService, LoginService, SolicitacaoService } from '../../services';
import { ElementoLoading } from '../../components';

@Component({
  selector: 'app-tela-historico',
  imports: [CommonModule, SharedModule, ElementoLoading],
  templateUrl: './tela-historico.html',
  styleUrl: './tela-historico.css'
})
export class TelaHistorico implements OnInit {
  private solicitacaoService = inject(SolicitacaoService);
  private loginService = inject(LoginService);

  mostrarDetalhes: boolean = false;

  idClienteLogado: number = -1;

  solicitacoes: SolicitacaoResumo[] = [];
  solicitacao!: Solicitacao;

  loading: boolean = false;

  ngOnInit(): void {
    const usuarioLogado = this.loginService.usuarioLogado;

    this.listarFinalizados(usuarioLogado?.id!);
  }

  abrirModalDetalhes(solicitacao: SolicitacaoResumo) {
    this.solicitacaoService.buscarPorId(solicitacao.id!).subscribe({
      next: (solicitacaoCompleta) => {
        if (solicitacaoCompleta) {
          this.solicitacao = solicitacaoCompleta;
          this.mostrarDetalhes = true;
        }
      },
      error: (erro) => {
        alert('Não foi possível carregar os detalhes da solicitação.');
      }
    });
  }

  getDataCriacao(solicitacao: Solicitacao): Date | null {
    const historicoCriacao = solicitacao.historico.find(historico => historico.status === StatusSolicitacao.ABERTA); 
    return historicoCriacao ? new Date(historicoCriacao.dataHora) : null;
  }

  getDataFinalizacao(solicitacao: Solicitacao): Date | null {
    const historicoFinal = solicitacao.historico.find(historico => historico.status === StatusSolicitacao.FINALIZADA); 
    return historicoFinal ? new Date(historicoFinal.dataHora) : null;
  }

  getStatusCor(status: number): string {
    return StatusSolicitacaoCor[status as StatusSolicitacao];
  }

  getStatusLabel(status: number): string {
    return StatusSolicitacaoLabel[status as StatusSolicitacao];
  }

  fecharModalDetalhes() {
    this.mostrarDetalhes = false;
  }

  listarFinalizados(idUsuario: number) {
    this.loading = true;

    this.solicitacaoService.listarFinalizados(idUsuario).subscribe({
      next: (solicitacoes: SolicitacaoResumo[] | null) => {
        this.solicitacoes = solicitacoes ?? [];

        this.loading = false;
      },
      error: (erro) => {
        if (erro.status === 500) {
          this.loading = false;
          alert(`Erro interno: ${erro.error}`);
        } else {
          this.loading = false;
          alert('Erro inesperado ao listar solicitações finalizadas do cliente.');
        }
      }
    });
  }
}
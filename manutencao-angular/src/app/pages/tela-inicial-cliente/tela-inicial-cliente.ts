import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FilterPipe } from '../../pipes/filter-pipe';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { Solicitacao, SolicitacaoResumo, UsuarioLogado, StatusSolicitacao, StatusSolicitacaoLabel, StatusSolicitacaoCor, SolicitacaoEntrada, Orcamento } from '../../shared';
import { LoginService, SolicitacaoService } from '../../services';

@Component({
  selector: 'app-tela-inicial-cliente',
  imports: [CommonModule, FilterPipe, FormsModule, RouterModule, MatIconModule],
  templateUrl: './tela-inicial-cliente.html',
  styleUrl: './tela-inicial-cliente.css'
})

export class TelaInicialCliente implements OnInit {
  solicitacoes: SolicitacaoResumo[] = [];

  mensagem: string = '';
  searchText: string = '';
  dateField = 'dataAbertura';
  selectedDate?: Date;
  filtroOrdenacao: 'desc' | 'asc' = 'asc';

  private solicitacaoService = inject(SolicitacaoService);
  private loginService = inject(LoginService);

  solicitacao!: Solicitacao;

  usuarioLogado: UsuarioLogado | null = null;

  mostrarPopupResgate: boolean = false;

  StatusSolicitacaoLabel = StatusSolicitacaoLabel;
  StatusSolicitacaoCor = StatusSolicitacaoCor;
  StatusSolicitacao = StatusSolicitacao;

  temArrumada: Record<number, boolean> = {};

  getStatusCor(status: number): string {
    return StatusSolicitacaoCor[status as StatusSolicitacao];
  }

  getStatusLabel(status: number): string {
    return StatusSolicitacaoLabel[status as StatusSolicitacao];
  }

  ngOnInit(): void {
    this.usuarioLogado = this.loginService.usuarioLogado;

    if(this.usuarioLogado){
      this.carregarSolicitacoes(this.usuarioLogado?.id);
    }
  }

  abrirResgate(idSolicitacao: number) {
    this.buscarSolicitacao(idSolicitacao);
    
    this.mostrarPopupResgate = true;
  }

  resgatarSolicitacao() {
    const orcamentoAlterado: Orcamento = {
      servicos: this.solicitacao.orcamento?.servicos,
      valorTotal: this.solicitacao.orcamento?.valorTotal!,
      aprovada: true
    }

    const solicitacaoResgatada: SolicitacaoEntrada = {
      id: this.solicitacao.id,
      orcamento: orcamentoAlterado
    }

    this.solicitacaoService.aprovarSolicitacao(solicitacaoResgatada).subscribe({
      next: (resposta) => {
        console.log('Solicitação resgatada com sucesso:', resposta);
        this.mostrarPopupResgate = false;
        
        if(this.usuarioLogado){
          this.carregarSolicitacoes(this.usuarioLogado?.id);
        }
      },
      error: (erro) => {
        console.error('Erro ao resgatar solicitação:', erro);
        alert('Erro ao resgatar solicitação. Tente novamente.');
      },
    });
  }

  cancelarResgate(){
    this.mostrarPopupResgate = false;
  }

  carregarSolicitacoes(idUsuario: number) {
    this.solicitacaoService.listarEmAndamento(idUsuario).subscribe({
      next: (solicitacoes: SolicitacaoResumo[] | null) => {
        this.solicitacoes = solicitacoes ?? [];
      },
      error: (erro) => {
        if (erro.status === 500) {
          alert(`Erro interno: ${erro.error}`);
        } else {
          alert('Erro inesperado ao listar solicitações finalizadas do cliente.');
        }
      }
    });
  }

  buscarSolicitacao(idSolicitacao: number): void {
    this.solicitacaoService.buscarPorId(idSolicitacao).subscribe({
      next: (solicitacao) => {
        if (solicitacao) {
          this.solicitacao = solicitacao;
        }
      },
      error: (erro) => console.error('Erro ao buscar solicitação:', erro)
    });
  }

  verificarArrumada(id: number) {
    if (this.temArrumada[id] !== undefined) return;

    this.solicitacaoService.buscarPorId(id).subscribe({
      next: (solicitacao) => {
        if (!solicitacao || !solicitacao.historico) {
          this.temArrumada[id] = false;
          return;
        }

        const podePagar =
          solicitacao.historico.some(h => h.status === StatusSolicitacao.ARRUMADA) &&
          !solicitacao.historico.some(h => h.status === StatusSolicitacao.PAGA);

        this.temArrumada[id] = podePagar;
      },
      error: () => this.temArrumada[id] = false
    });
  }
}
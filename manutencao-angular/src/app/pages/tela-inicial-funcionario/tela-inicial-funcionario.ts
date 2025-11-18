import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FilterPipe } from '../../pipes/filter-pipe';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { SolicitacaoService } from '../../services';
import { SolicitacaoResumo, StatusSolicitacao, StatusSolicitacaoCor, StatusSolicitacaoLabel } from '../../shared';
import { ElementoLoading } from '../../components';

@Component({
  selector: 'app-tela-inicial-funcionario',
  imports: [CommonModule, FilterPipe, FormsModule, RouterModule, MatIconModule, ElementoLoading],
  templateUrl: './tela-inicial-funcionario.html',
  styleUrl: './tela-inicial-funcionario.css'
})
export class TelaInicialFuncionario implements OnInit {
  solicitacoes: SolicitacaoResumo[] = [];

  searchText: string = '';
  dateField = 'dataAbertura';
  selectedDate?: Date;
  filtroOrdenacao: 'desc' | 'asc' = 'asc';

  private solicitacaoService = inject(SolicitacaoService);

  StatusSolicitacaoLabel = StatusSolicitacaoLabel;
  StatusSolicitacaoCor = StatusSolicitacaoCor;
  StatusSolicitacao = StatusSolicitacao;

  loading: boolean = false;

  getStatusCor(status: number): string {
    return StatusSolicitacaoCor[status as StatusSolicitacao];
  }

  getStatusLabel(status: number): string {
    return StatusSolicitacaoLabel[status as StatusSolicitacao];
  }

  ngOnInit(): void {
    this.carregarSolicitacoes();
  }

  carregarSolicitacoes(): SolicitacaoResumo[] {
    this.loading = true;

    this.solicitacaoService.listarAbertas().subscribe({
      next: (solicitacoes: SolicitacaoResumo[] | null) => {
        this.solicitacoes = solicitacoes ?? [];
        this.loading = false;
      },
      error: (erro) => {
        if (erro.status === 500) {
          alert(`Erro interno: ${erro.error}`);
        } else {
          alert('Erro inesperado ao listar solicitações finalizadas do cliente.');
        }
      }
    });

    return this.solicitacoes;
  }
}

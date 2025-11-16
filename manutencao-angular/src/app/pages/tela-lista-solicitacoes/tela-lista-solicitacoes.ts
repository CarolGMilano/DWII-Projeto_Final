import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FilterPipe } from '../../pipes/filter-pipe';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { SolicitacaoService, LoginService, FuncionarioService } from '../../services';
import { SolicitacaoResumo, UsuarioLogado, StatusSolicitacao, StatusSolicitacaoCor, StatusSolicitacaoLabel } from '../../shared';
import { ElementoLoading } from '../../components';

@Component({
  selector: 'app-tela-lista-solicitacoes',
  imports: [CommonModule, FilterPipe, FormsModule, RouterModule, MatIconModule, ElementoLoading],
  templateUrl: './tela-lista-solicitacoes.html',
  styleUrl: './tela-lista-solicitacoes.css'
})
export class TelaListaSolicitacoes implements OnInit {
  solicitacoes: SolicitacaoResumo[] = [];

  searchText: string = '';
  dateField?: string = '';
  selectedDate?: Date | string;
  filtroOrdenacao: 'desc' | 'asc' = 'asc';
  startDate?: Date;
  endDate?: Date;

  private solicitacaoService = inject(SolicitacaoService);
  private loginService = inject(LoginService);
  private funcionarioService = inject(FuncionarioService);

  usuarioLogado: UsuarioLogado | null = null;
  idFuncionarioLogado: number = -1;

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
    this.usuarioLogado = this.loginService.usuarioLogado;

    if (this.usuarioLogado) {
      this.buscarFuncionarioPorUsuario(this.usuarioLogado.id);
    }
  }

  buscarFuncionarioPorUsuario(idUsuario: number): void {
    this.loading = true;

    this.funcionarioService.buscarPorUsuario(idUsuario).subscribe({
      next: (funcionario) => {
        if (funcionario) {
          this.idFuncionarioLogado = funcionario.id;
          this.carregarSolicitacoes(this.idFuncionarioLogado);
        }
      },
      error: (erro) => console.error('Erro ao buscar funcionário:', erro)
    });
  }

  carregarSolicitacoes(idFuncionarioLogado: number): void {
    this.solicitacaoService.listarTodasFiltradasResumo(idFuncionarioLogado).subscribe({
      next: (solicitacoes: SolicitacaoResumo[] | null) => {
        this.solicitacoes = solicitacoes ?? [];
        this.loading = false;
      },
      error: (erro) => {
        if (erro.status === 500) {
          alert(`Erro interno: ${erro.error}`);
        } else {
          alert('Erro inesperado ao listar solicitações.');
        }
      }
    });
  }

  filtrarHoje() {
    const hoje = new Date();
    const yyyy = hoje.getFullYear();
    const mm = String(hoje.getMonth() + 1).padStart(2, '0');
    const dd = String(hoje.getDate()).padStart(2, '0');

    this.selectedDate = `${yyyy}-${mm}-${dd}`;
    this.startDate = undefined;
    this.endDate = undefined;
  }

  limparFiltroData() {
    this.selectedDate = undefined;
    this.startDate = undefined;
    this.endDate = undefined;
  }
}

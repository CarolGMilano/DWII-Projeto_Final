import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { SolicitacaoService } from '../../services';
import { Solicitacao, StatusSolicitacao, StatusSolicitacaoLabel, StatusSolicitacaoCor, StatusSolicitacaoObservacao } from '../../shared';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-visualizar-servico',
  imports: [CommonModule, RouterLink],
  templateUrl: './visualizar-servico.html',
  styleUrl: './visualizar-servico.css'
})
export class VisualizarServico  implements OnInit{
  private solicitacaoService = inject(SolicitacaoService);
  private route = inject(ActivatedRoute);

  id!: number;
  solicitacao! : Solicitacao;

  StatusSolicitacaoLabel = StatusSolicitacaoLabel;
  StatusSolicitacaoCor = StatusSolicitacaoCor;
  StatusSolicitacao = StatusSolicitacao;

  getStatusCor(status: number): string {
    return StatusSolicitacaoCor[status as StatusSolicitacao];
  }

  getStatusLabel(status: number): string {
    return StatusSolicitacaoLabel[status as StatusSolicitacao];
  }

  getStatusObservacao(status: number): string {
    return StatusSolicitacaoObservacao[status as StatusSolicitacao];
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.params['id']);

    this.buscarSolicitacao(this.id);
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
}

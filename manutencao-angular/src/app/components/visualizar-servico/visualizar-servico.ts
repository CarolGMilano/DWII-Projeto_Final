import { Component, inject, OnInit } from '@angular/core';
import { SolicitacaoModel } from '../../models/Solicitacao';
import { SolicitacaoService } from '../../services';
import { ActivatedRoute } from '@angular/router';
import { HistoricoSolicitacao } from '../../models/HistoricoSolicitacao';

@Component({
  selector: 'app-visualizar-servico',
  imports: [],
  templateUrl: './visualizar-servico.html',
  styleUrl: './visualizar-servico.css'
})
export class VisualizarServico  implements OnInit{
  
  id!: number;

  solicitacao! : SolicitacaoModel;
  historico!: HistoricoSolicitacao[];

  private dadosService = inject(SolicitacaoService);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.params['id']);

    this.dadosService.getSolicitacao(id).subscribe({
      next: (res) => this.solicitacao = res,
      error: (err) => console.error('Erro ao buscar solicitação:', err)
    });

    this.dadosService.getHistorico(id).subscribe({
      next: (res) => this.historico = res,
      error: (err) => console.error('Erro ao buscar histórico:', err)
    });

  }
}

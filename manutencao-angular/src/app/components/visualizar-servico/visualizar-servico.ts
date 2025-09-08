import { Component } from '@angular/core';
import { SolicitacaoModel } from '../../models/solicitacao.model';
import { SolicitacaoService } from '../../services/solicitacao';

@Component({
  selector: 'app-visualizar-servico',
  imports: [],
  templateUrl: './visualizar-servico.html',
  styleUrl: './visualizar-servico.css'
})
export class VisualizarServico {
  id!: number;

  constructor(private solicitacaoService: SolicitacaoService){}
  
  ngOnInit(): void {
    this.solicitacaoService.getSolicitacao(this.id);
  }
}

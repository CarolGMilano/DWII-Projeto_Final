import { Component } from '@angular/core';
import { Solicitacao } from '../../services/solicitacao';

@Component({
  selector: 'app-visualizar-servico',
  imports: [],
  templateUrl: './visualizar-servico.html',
  styleUrl: './visualizar-servico.css'
})
export class VisualizarServico {
  id!: number;

  constructor(private solicitacaoService: Solicitacao){}
  
  ngOnInit(): void {
    this.solicitacaoService.getSolicitacao(this.id);
  }
}

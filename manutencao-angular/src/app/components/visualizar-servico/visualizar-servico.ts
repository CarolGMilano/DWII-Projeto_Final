import { Component, OnInit } from '@angular/core';
import { Solicitacao } from '../../services/solicitacao/solicitacao.service';

@Component({
  selector: 'app-visualizar-servico',
  imports: [],
  templateUrl: './visualizar-servico.html',
  styleUrl: './visualizar-servico.css'
})
export class VisualizarServico implements OnInit {
  id!: number;

  constructor(private solicitacaoService: Solicitacao){}
  
  ngOnInit(): void {
    this.solicitacaoService.getSolicitacao(this.id);
  }
}

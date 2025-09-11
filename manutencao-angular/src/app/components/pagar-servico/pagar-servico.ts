import { Component, inject, OnInit } from '@angular/core';
import { SolicitacaoService } from '../../services';
import { SolicitacaoModel } from '../../models/Solicitacao';
import { ActivatedRoute } from '@angular/router';
import { EstadoSolicitacao } from '../../models/EnumEstadoSolicitacao';

@Component({
  selector: 'app-pagar-servico',
  imports: [],
  templateUrl: './pagar-servico.html',
  styleUrl: './pagar-servico.css'
})
export class PagarServico implements OnInit{
  solicitacao! : SolicitacaoModel;

  private dadosService = inject(SolicitacaoService);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.params['id']);

    this.dadosService.getSolicitacao(id).subscribe({
      next: (res) => this.solicitacao = res,
      error: (err) => console.error('Erro ao buscar solicitação:', err)
    });

    this.dadosService.atualizarStatus(id, EstadoSolicitacao.PAGA).subscribe({
      next: (res) => this.solicitacao = res,
      error: (err) => console.error('Erro ao atualizar status:', err)
    });
  }

  showModal(modal: HTMLDialogElement) {
    modal.showModal();
  }

  closeModal(modal: HTMLDialogElement) {
    modal.close();
  }
   
}

import { Component, inject, OnInit } from '@angular/core';
import { SolicitacaoService } from '../../services';
import { SolicitacaoModel } from '../../models/solicitacao.model';
import { ActivatedRoute } from '@angular/router';

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
  }

  showModal(modal: HTMLDialogElement) {
    modal.showModal();
  }
  closeModal(modal: HTMLDialogElement) {
    modal.close();
  }
   
}

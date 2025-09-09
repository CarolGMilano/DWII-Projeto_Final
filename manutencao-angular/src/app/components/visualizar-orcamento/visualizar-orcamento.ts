import { NgFor } from '@angular/common';
import { Component, ElementRef, inject, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import {  ReactiveFormsModule, NgForm, FormsModule } from "@angular/forms";
import { SolicitacaoModel } from '../../models/solicitacao.model';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SolicitacaoService } from '../../services';

@Component({
  selector: 'app-visualizar-orcamento',
  imports: [FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './visualizar-orcamento.html',
  styleUrl: './visualizar-orcamento.css'
})
export class VisualizarOrcamento implements OnInit{
  
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

  justificativa = '';

  showModal(modal: HTMLDialogElement) {
    modal.showModal();
  }

  closeModal(modal: HTMLDialogElement) {
    modal.close();
  }

  //finalizar ainda justificativa de rej por conta do back
  enviarRejeicao(modal: HTMLDialogElement, form: NgForm) {
    const payload = {
      id: this.solicitacao.id,
      justificativa: this.justificativa
    };

    this.dadosService.atualizarStatus(this.solicitacao.id, 'REJEITADA').subscribe({
      next: (res) => {
        this.solicitacao = res;
      },
      error: (err) => console.error('Erro ao aprovar solicitação:', err)
    });
  }

  enviarAprovacao() : void {
    this.dadosService.atualizarStatus(this.solicitacao.id, 'APROVADA').subscribe({
      next: (res) => {
        this.solicitacao = res;
      },
      error: (err) => console.error('Erro ao aprovar solicitação:', err)
    });
  }
}

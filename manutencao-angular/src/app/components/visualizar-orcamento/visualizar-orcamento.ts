import { NgFor } from '@angular/common';
import { Component, ElementRef, inject, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import {  ReactiveFormsModule, NgForm, FormsModule } from "@angular/forms";
import { SolicitacaoModel } from '../../models/Solicitacao';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SolicitacaoService } from '../../services';
import { OrcamentoModel } from '../../models/Orcamento';
import { EstadoSolicitacao } from '../../models/EnumEstadoSolicitacao';

@Component({
  selector: 'app-visualizar-orcamento',
  imports: [FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './visualizar-orcamento.html',
  styleUrl: './visualizar-orcamento.css'
})
export class VisualizarOrcamento implements OnInit{
  
  solicitacao! : SolicitacaoModel;
  orcamento!: OrcamentoModel;

  private dadosService = inject(SolicitacaoService);
  private route = inject(ActivatedRoute);
  justificativa = '';

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

  //finalizar ainda justificativa de rej por conta do back
  enviarRejeicao(modal: HTMLDialogElement, form: NgForm) {
    if (!this.justificativa.trim()) {
      alert('Por favor, informe o motivo da rejeição.');
      return;
    }

    this.dadosService.atualizarStatus(this.solicitacao.id, EstadoSolicitacao.REJEITADA, this.justificativa).subscribe({
      next: (res) => {
        this.solicitacao = res;
        modal.close();
      },
      error: (err) => console.error('Erro ao rejeitar solicitação:', err)
    });
  }

  enviarAprovacao() : void {
    this.dadosService.atualizarStatus(this.solicitacao.id, EstadoSolicitacao.APROVADA).subscribe({
      next: (res) => {
        this.solicitacao = res;
      },
      error: (err) => console.error('Erro ao aprovar solicitação:', err)
    });
  }
}

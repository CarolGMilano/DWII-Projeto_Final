import { NgFor } from '@angular/common';
import { Component, ElementRef, inject, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import {  ReactiveFormsModule, NgForm, FormsModule } from "@angular/forms";
import { SolicitacaoModel } from '../../models/Solicitacao';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { SolicitacaoService } from '../../services';
import { OrcamentoModel } from '../../models/Orcamento';
import { EstadoSolicitacao } from '../../models/EnumEstadoSolicitacao';
import { MoedaBrPipe } from '../../pipes/moeda/moeda-pipe-pipe';

@Component({
  selector: 'app-visualizar-orcamento',
  imports: [FormsModule, ReactiveFormsModule, RouterModule, RouterLink, MoedaBrPipe],
  templateUrl: './visualizar-orcamento.html',
  styleUrl: './visualizar-orcamento.css'
})
export class VisualizarOrcamento implements OnInit{
  
  solicitacao! : SolicitacaoModel;
  orcamento!: OrcamentoModel;

  private dadosService = inject(SolicitacaoService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  justificativa = '';

  ngOnInit(): void {
    const id = Number(this.route.snapshot.params['id']);
/*
    this.dadosService.getSolicitacao(this.solicitacao).subscribe({
      next: (res) => this.solicitacao = res,
      error: (err) => console.error('Erro ao buscar solicitação:', err)
    });*/
  }

  showModal(modal: HTMLDialogElement) {
    modal.showModal();
  }

  closeModal(modal: HTMLDialogElement) {
    modal.close();
    this.router.navigate(['/visualizar-orcamento/:id']);
  }
/*
  //finalizar ainda justificativa de rej por conta do back
  enviarRejeicao(modal: HTMLDialogElement, form: NgForm) {
    if (!this.justificativa.trim()) {
      alert('Por favor, informe o motivo da rejeição.');
      return;
    }

    this.dadosService.atualizarStatus(this.solicitacao, EstadoSolicitacao.REJEITADA, this.justificativa).subscribe({
      next: (res) => {
        this.solicitacao = res;
        modal.close();
      },
      error: (err) => console.error('Erro ao rejeitar solicitação:', err)
    });
  }

  enviarAprovacao() : void {
    this.dadosService.atualizarStatus(this.solicitacao, EstadoSolicitacao.APROVADA).subscribe({
      next: (res) => {
        this.solicitacao = res;
      },
      error: (err) => console.error('Erro ao aprovar solicitação:', err)
    });
  }*/
}

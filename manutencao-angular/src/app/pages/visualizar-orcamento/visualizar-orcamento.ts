import { Component, ElementRef, inject, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import {  ReactiveFormsModule, NgForm, FormsModule } from "@angular/forms";
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { MoedaBrPipe } from '../../pipes/moeda/moeda-pipe-pipe';

import { Orcamento, Solicitacao, SolicitacaoEntrada } from '../../shared';
import { SolicitacaoService } from '../../services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-visualizar-orcamento',
  imports: [FormsModule, ReactiveFormsModule, RouterModule, RouterLink, CommonModule],
  templateUrl: './visualizar-orcamento.html',
  styleUrl: './visualizar-orcamento.css'
})
export class VisualizarOrcamento implements OnInit{
  @ViewChild('modalAceitar') modalAceitar!: ElementRef<HTMLDialogElement>;
  @ViewChild('modalRecusar') modalRecusar!: ElementRef<HTMLDialogElement>;

  solicitacao! : Solicitacao;

  private solicitacaoService = inject(SolicitacaoService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  id!: number;

  justificativa = '';

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

  showModal(modal: HTMLDialogElement) {
    modal.showModal();
  }

  mostrarModalAprovacao() {
    this.modalAceitar.nativeElement.showModal();
  }

  closeModal(modal: HTMLDialogElement) {
    modal.close();
    this.router.navigate([]);
  }

  aoSubmitRecusar() {
    this.rejeitarOrcamento(); 
  }

  aprovarOrcamento(){
    const orcamentoAtualizado: Orcamento = {
      servicos: this.solicitacao.orcamento?.servicos,
      valorTotal: this.solicitacao.orcamento?.valorTotal!,
      aprovada: true
    }

    const solicitacaoAprovada: SolicitacaoEntrada = {
      id: this.solicitacao.id,
      orcamento: orcamentoAtualizado
    }

    this.solicitacaoService.aprovarSolicitacao(solicitacaoAprovada).subscribe({
      next: (resposta) => {
        console.log('Solicitação aprovada com sucesso:', resposta);
        this.mostrarModalAprovacao();
      },
      error: (erro) => {
        console.error('Erro ao aprovar solicitação:', erro);
        alert('Erro ao aprovar solicitação. Tente novamente.');
      },
    });
  }

  rejeitarOrcamento(){
    const orcamentoAtualizado: Orcamento = {
      servicos: this.solicitacao.orcamento?.servicos,
      valorTotal: this.solicitacao.orcamento?.valorTotal!,
      aprovada: false,
      msgRejeicao: this.justificativa
    }

    const solicitacaoAprovada: SolicitacaoEntrada = {
      id: this.solicitacao.id,
      orcamento: orcamentoAtualizado
    }

    this.solicitacaoService.rejeitarSolicitacao(solicitacaoAprovada).subscribe({
      next: (resposta) => {
        console.log('Solicitação rejeitada com sucesso:', resposta);

        this.modalRecusar.nativeElement.close();
        this.router.navigate(['/tela-inicial-cliente']);
      },
      error: (erro) => {
        console.error('Erro ao rejeirar solicitação:', erro);
        alert('Erro ao rejeitar solicitação. Tente novamente.');
      },
    });
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

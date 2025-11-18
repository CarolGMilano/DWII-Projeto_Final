import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoedaBrPipe } from '../../pipes/moeda/moeda-pipe-pipe';

import { Solicitacao, SolicitacaoEntrada } from '../../shared';
import { SolicitacaoService } from '../../services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagar-servico',
  imports: [MoedaBrPipe, CommonModule],
  templateUrl: './pagar-servico.html',
  styleUrl: './pagar-servico.css'
})
export class PagarServico implements OnInit{
  @ViewChild('modalPagar') modalPagar!: ElementRef<HTMLDialogElement>;

  solicitacao! : Solicitacao;

  private solicitacaoService = inject(SolicitacaoService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  id!: number;

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.params['id']);

    this.buscarSolicitacao(this.id);
  }

  showModal() {
    this.modalPagar.nativeElement.showModal();
  }

  closeModal(modal: HTMLDialogElement) {
    modal.close();
    this.router.navigate(['/tela-inicial-cliente']);
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

  pagarSolicitacao(){
    const solicitacaoPaga: SolicitacaoEntrada = {
      id: this.solicitacao.id,
    }

    this.solicitacaoService.pagarSolicitacao(solicitacaoPaga).subscribe({
      next: (resposta) => {
        if (resposta) {
          this.solicitacao = resposta;
          
          this.showModal();
        }
      },
      error: (erro) => {
        alert('Ocorreu um erro ao pagar solicitação. Tente novamente.');
      }
    });
  }
}
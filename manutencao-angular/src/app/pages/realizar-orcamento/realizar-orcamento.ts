import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Orcamento, Servico, Solicitacao, SolicitacaoEntrada, UsuarioLogado } from '../../shared';
import { LoginService, SolicitacaoService } from '../../services';

@Component({
  selector: 'app-realizar-orcamento',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './realizar-orcamento.html',
  styleUrl: './realizar-orcamento.css'
})

export class RealizarOrcamento implements OnInit {
  @Input() titulo: string = 'Realizar Orçamento';
  //@Output() onSubmit = new EventEmitter<SolicitacaoModel>();
  
  solicitacao!: Solicitacao;
  precototal: number = 0;
  servicos: Servico[] = [];

  id!: number;
  usuarioLogado: UsuarioLogado | null = null;

  private solicitacaoService = inject(SolicitacaoService);
  private loginService = inject(LoginService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  orcamentoForm = new FormGroup({
    //Aqui, seria interessante colocar uma validação apenas para se o "itens" estiver vazio, pois como a cada adição ele apaga os campos, sempre será formulário inválido.  
    itens: new FormArray([]),
    precoTotal: new FormControl(0),
    novoItemDescricao: new FormControl('', Validators.required),
    novoItemPreco: new FormControl(0, [Validators.required, Validators.min(0)])
  });

  ngOnInit(): void {
    this.usuarioLogado = this.loginService.usuarioLogado;
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

  get itens(): FormArray {
    return this.orcamentoForm.get('itens') as FormArray;
  }

  adicionarItem() {
    const descricao = this.orcamentoForm.get('novoItemDescricao')?.value ?? '';
    const preco = this.orcamentoForm.get('novoItemPreco')?.value ?? 0;

    const item = new FormGroup({
      descricao: new FormControl(descricao, Validators.required),
      preco: new FormControl(preco, [Validators.required, Validators.min(0)])
    });

    if(preco <= 0){
      return;
    }
 
    const novoServico: Servico = { descricao, preco };
    this.servicos.push(novoServico);

    this.itens.push(item);
    this.orcamentoForm.get('novoItemDescricao')?.reset();
    this.orcamentoForm.get('novoItemPreco')?.reset();
    this.atualizarTotal();
  }

  removerItem(index: number) {
    this.itens.removeAt(index);
    this.servicos.splice(index, 1);
    this.atualizarTotal();
  }

  atualizarTotal() {
    const total = this.itens.controls.reduce((acc, item) => {
      const preco = item.get('preco')?.value || 0;
      return acc + preco;
    }, 0);

    this.orcamentoForm.get('precoTotal')?.setValue(total);
    this.precototal = total;
  }

  enviarOrcamento() {
    const descricaoPreco = this.itens.value;
    const precoTotal = this.orcamentoForm.get('precoTotal')?.value ?? 0;

    const novoOrcamento: Orcamento = {
      servicos: this.servicos,
      valorTotal: precoTotal
    }

    const solicitacaoOrcada: SolicitacaoEntrada = {
      id: this.solicitacao.id,
      orcamento: novoOrcamento,
      funcionario: this.usuarioLogado?.id
    }

    this.solicitacaoService.orcarSolicitacao(solicitacaoOrcada).subscribe({
      next: (resposta) => {
        this.router.navigate(['/tela-lista-solicitacoes']);
      },
      error: (erro) => {
        console.error('Erro ao orçar solicitação:', erro);
        alert('Erro ao orçar solicitação. Tente novamente.');
      },
    });
  }

  voltar(){
    this.router.navigate(['/tela-lista-solicitacoes']);
  }
}


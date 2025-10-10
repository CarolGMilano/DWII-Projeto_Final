import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { SolicitacaoModel } from '../../models/Solicitacao';
import { SolicitacaoService } from '../../services';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EstadoSolicitacao } from '../../models/EnumEstadoSolicitacao';

@Component({
  selector: 'app-realizar-orcamento',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './realizar-orcamento.html',
  styleUrl: './realizar-orcamento.css'
})

export class RealizarOrcamento implements OnInit {
  @Input() titulo: string = 'Realizar Orçamento';
  @Output() onSubmit = new EventEmitter<SolicitacaoModel>();
  
  solicitacao! : SolicitacaoModel;
  private dadosService = inject(SolicitacaoService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  orcamentoForm = new FormGroup({
   itens: new FormArray([]),
   precoTotal: new FormControl(0),
   novoItemDescricao: new FormControl('', Validators.required),
   novoItemPreco: new FormControl(0, [Validators.required, Validators.min(0)])
 });

  ngOnInit(): void {
    const id = Number(this.route.snapshot.params['id']);

    this.dadosService.getSolicitacao(id).subscribe({
      next: (res) => this.solicitacao = res,
      error: (err) => {
        console.error('Erro ao buscar solicitação:', err)
        
        this.solicitacao = {
        id,
        equipamento: 'Monitor LG 24"',
        categoria: { id: 2, nome: 'Monitores' },
        descricao: 'Tela piscando e com manchas.',
        descricaoPreco: [
          { descricao: 'Substituição do cabo HDMI', preco: 30 },
          { descricao: 'Troca de backlight', preco: 200 }
        ],
        precoTotal: 230,
        pago: false,
        data: new Date(),
        estado: EstadoSolicitacao.ABERTA
      };
      }
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

    this.itens.push(item);
    this.orcamentoForm.get('novoItemDescricao')?.reset();
    this.orcamentoForm.get('novoItemPreco')?.reset();
    this.atualizarTotal();
  }

  removerItem(index: number) {
    this.itens.removeAt(index);
    this.atualizarTotal();
  }

  atualizarTotal() {
    const total = this.itens.controls.reduce((acc, item) => {
      const preco = item.get('preco')?.value || 0;
      return acc + preco;
    }, 0);
    this.orcamentoForm.get('precoTotal')?.setValue(total);
  }

  enviarOrcamento() {
    const descricaoPreco = this.itens.value;
    const precoTotal = this.orcamentoForm.get('precoTotal')?.value ?? 0;

    this.dadosService.enviarOrcamento(this.solicitacao.id, precoTotal, descricaoPreco).subscribe({
      next: (res) => {
        console.log('Orçamento enviado com sucesso:', res);
        this.onSubmit.emit(res);
      },
      error: (err) => console.error('Erro ao enviar orçamento:', err)
    });
  }

  voltar(){
    this.router.navigate(['/tela-inicial-funcionario']);
  }
}


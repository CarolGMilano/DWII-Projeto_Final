import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NovaSolicitacaoModel } from '../../models/NovaSolicitacao';
import { SolicitacaoService } from '../../services';
import { Categoria } from '../../models/Categoria';
import { EstadoSolicitacao } from '../../models/EnumEstadoSolicitacao';
import { MatIconModule } from '@angular/material/icon';
import { VoltarTela } from '../voltar-tela/voltar-tela';
import { Router, RouterLink } from '@angular/router';
import { CategoriaService } from '../../services/categoria/categoria';

@Component({
  selector: 'app-nova-solicitacao',
  imports: [ReactiveFormsModule, MatIconModule, VoltarTela],
  templateUrl: './nova-solicitacao.html',
  styleUrl: './nova-solicitacao.css'
})
export class NovaSolicitacao implements OnInit {
  @Output() onSubmit = new EventEmitter<NovaSolicitacaoModel>();

  categorias: Categoria[] = [];

  private categoriaService = inject(CategoriaService);
  private solicitacaoService = inject(SolicitacaoService);
  private router = inject(Router);

  ngOnInit(): void {
    this.categoriaService.categorias.subscribe({
      next: (dados) => console.log(this.categorias = dados),
      error: (err) => console.error('Erro ao carregar categorias:', err)
    });

    console.log(this.categorias)
  }

  criarSolicitacao = new FormGroup({
    equipamento: new FormControl('', Validators.required),
    categoria: new FormControl('', Validators.required),
    descricao: new FormControl('', Validators.required)
  });

  enviarSolicitacao() {
    const rawValue = this.criarSolicitacao.getRawValue();
    let categoriaEncontrada: number | undefined;

    this.categorias.forEach(cat => {
      if (cat.descricao === rawValue.categoria) {
        categoriaEncontrada = cat.id;
        console.log(cat)
      }
    });

    if (!categoriaEncontrada) {
      console.error('Categoria não encontrada:', rawValue.categoria);
      return;
    }

    if (!rawValue.equipamento) {
      console.error('Equipamento não informado', rawValue.equipamento);
      return;
    }

    if (!rawValue.descricao) {
      console.error('Descrição não informada', rawValue.descricao);
      return;
    }

    const clienteString = localStorage.getItem("usuarioLogado");
    const clienteObj = clienteString ? JSON.parse(clienteString) : null;

    console.log(clienteObj);

    const novaSolicitacao: NovaSolicitacaoModel = {
      equipamento: rawValue.equipamento,
      categoria: categoriaEncontrada,
      descricao: rawValue.descricao,
      status: EstadoSolicitacao.ABERTA,
      cliente: { id: clienteObj.id },
      funcionario: { id: 2 }
    };


    this.solicitacaoService.postSolicitacao(novaSolicitacao).subscribe({
      next: (resposta) => {

        if (!resposta) {
          console.error('Resposta nula', resposta);
          return;
        }
        console.log('Solicitação criada com sucesso:', resposta);

        this.onSubmit.emit(resposta);
        this.router.navigate(['/tela-inicial-cliente']);
      },
      error: (err) => {
        console.error('Erro ao criar solicitação:', err);
        alert('Erro ao criar solicitação. Tente novamente.');
      },
    });
  }
}

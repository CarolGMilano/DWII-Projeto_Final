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
  imports: [ReactiveFormsModule, MatIconModule, VoltarTela, RouterLink],
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
      next: (dados) => this.categorias = dados,
      error: (err) => console.error('Erro ao carregar categorias:', err)
    });
  }

  criarSolicitacao = new FormGroup({
    equipamento: new FormControl('', Validators.required),
    categoria: new FormControl('', Validators.required),
    descricao: new FormControl('', Validators.required)
  });

  enviarSolicitacao() {
    const rawValue = this.criarSolicitacao.getRawValue();
    let categoriaEncontrada: Categoria | undefined;

    this.categorias.forEach(cat => {
      if (cat.nome === rawValue.categoria) {
        categoriaEncontrada = cat;
      }
    });

    if (!categoriaEncontrada) {
      console.error('Categoria não encontrada:', rawValue.categoria);
      return;
    }

    const novaSolicitacao: NovaSolicitacaoModel = {
      equipamento: rawValue.equipamento ?? '',
      categoria: categoriaEncontrada,
      descricao: rawValue.descricao ?? '',
      estado: EstadoSolicitacao.ABERTA
    };
/*
    this.solicitacaoService.postSolicitacao(novaSolicitacao).subscribe({
      next: (resposta) => {
        console.log('Solicitação criada com sucesso:', resposta);

        this.onSubmit.emit(resposta);
        this.router.navigate(['/tela-inicial-cliente']);
      },
      error: (err) => {
        console.error('Erro ao criar solicitação:', err);
        alert('Erro ao criar solicitação. Tente novamente.');
      },
    });
*/
  }
}

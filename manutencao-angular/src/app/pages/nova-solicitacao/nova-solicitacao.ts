import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { VoltarTela } from '../../components/voltar-tela/voltar-tela';
import { Router, RouterLink } from '@angular/router';

import { SolicitacaoEntrada, UsuarioLogado, Categoria } from '../../shared';
import { LoginService, SolicitacaoService, CategoriaService } from '../../services';

@Component({
  selector: 'app-nova-solicitacao',
  imports: [ReactiveFormsModule, MatIconModule, VoltarTela],
  templateUrl: './nova-solicitacao.html',
  styleUrl: './nova-solicitacao.css'
})
export class NovaSolicitacao implements OnInit {
  //@Output() onSubmit = new EventEmitter<NovaSolicitacaoModel>();

  categorias: Categoria[] = []; 

  private categoriaService = inject(CategoriaService);
  private solicitacaoService = inject(SolicitacaoService);
  private loginService = inject(LoginService);
  private router = inject(Router); 

  usuarioLogado: UsuarioLogado | null = null;

  ngOnInit(): void {
    this.usuarioLogado = this.loginService.usuarioLogado;

    this.listarTodos();
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
      if (cat.descricao === rawValue.categoria) {
        categoriaEncontrada = cat;
      }
    });

    if (!categoriaEncontrada) {
      console.error('Categoria não encontrada:', rawValue.categoria);
      return;
    }

    const novaSolicitacao: SolicitacaoEntrada = {
      equipamento: rawValue.equipamento!,
      categoria: categoriaEncontrada.id,
      descricao: rawValue.descricao!,
      cliente: this.usuarioLogado?.id
    }

    this.solicitacaoService.inserirSolicitacao(novaSolicitacao).subscribe({
      next: (resposta) => {
        console.log('Solicitação criada com sucesso:', resposta);

        this.router.navigate(['/tela-inicial-cliente']);
      },
      error: (erro) => {
        console.error('Erro ao criar solicitação:', erro);
        alert('Erro ao criar solicitação. Tente novamente.');
      },
    });
  }

  listarTodos() {
    this.categoriaService.listar().subscribe({
      next: (categorias: Categoria[] | null) => {
        if(categorias == null){
          this.categorias = [];
        } else {
          this.categorias = categorias;
        }
      },
      error: (erro) => {
        if (erro.status === 500) {
          alert(`Erro interno: ${erro.error}`);
        } else {
          alert('Erro inesperado ao listar categorias.');
        }
      }
    });
  }
}

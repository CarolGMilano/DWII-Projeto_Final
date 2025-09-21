import { Component, EventEmitter, inject, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NovaSolicitacaoModel } from '../../models/NovaSolicitacao';
import { SolicitacaoService } from '../../services';
import { Categoria } from '../../models/Categoria';
import { EstadoSolicitacao } from '../../models/EnumEstadoSolicitacao';
import { MatIconModule } from '@angular/material/icon';
import { VoltarTela } from '../voltar-tela/voltar-tela';

@Component({
  selector: 'app-nova-solicitacao',
  imports: [ReactiveFormsModule, MatIconModule, VoltarTela],
  templateUrl: './nova-solicitacao.html',
  styleUrl: './nova-solicitacao.css'
})

export class NovaSolicitacao implements OnInit{
  @Output() onSubmit = new EventEmitter<NovaSolicitacaoModel>();

  categorias : Categoria[] = [];

  private solicitacaoService =  inject(SolicitacaoService);

  ngOnInit(): void {
    this.solicitacaoService.categorias.subscribe({
      next: (dados) => this.categorias = dados,
      error: (err) => console.error('Erro ao carregar categorias:', err)
    });
  }

  criarSolicitacao =  new FormGroup({
    equipamento: new FormControl('', Validators.required),
    categoria: new FormControl('', Validators.required),
    descricao: new FormControl('', Validators.required)
  });

  enviarSolicitacao() {
    const rawValue = this.criarSolicitacao.getRawValue();
    let categoriaEncontrada: Categoria | undefined;

    this.categorias.forEach(cat => {
      if(cat.nome === rawValue.categoria){
        categoriaEncontrada = cat;
      };
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

    this.onSubmit.emit(novaSolicitacao);
  }

}

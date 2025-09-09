import { Component, EventEmitter, inject, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NovaSolicitacaoModel } from '../../models/nova-solicitacao.model';
import { SolicitacaoService } from '../../services';


@Component({
  selector: 'app-nova-solicitacao',
  imports: [ReactiveFormsModule],
  templateUrl: './nova-solicitacao.html',
  styleUrl: './nova-solicitacao.css'
})
export class NovaSolicitacao implements OnInit{
  @Output() onSubmit = new EventEmitter<NovaSolicitacaoModel>();

  // categorias : Categoria[] = [];

  categorias: { id: number; nome: string }[] = [];  
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
    descricao: new FormControl('', Validators.required),
  });

  enviarSolicitacao(){
  
    this.onSubmit.emit(this.criarSolicitacao.value as NovaSolicitacaoModel)
  }
}

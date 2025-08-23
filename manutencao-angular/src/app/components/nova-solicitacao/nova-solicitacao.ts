import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NovaSolicitacaoModel } from '../../models/nova-solicitacao.model';

@Component({
  selector: 'app-nova-solicitacao',
  imports: [ReactiveFormsModule],
  templateUrl: './nova-solicitacao.html',
  styleUrl: './nova-solicitacao.css'
})
export class NovaSolicitacao {

  @Output() onSubmit = new EventEmitter<NovaSolicitacaoModel>();

  criarSolicitacao =  new FormGroup({
    equipamento: new FormControl('', Validators.required),
    categoria: new FormControl('', Validators.required),
    descricao: new FormControl('', Validators.required),
  });

  enviarSolicitacao(){
    this.onSubmit.emit(this.criarSolicitacao.value as NovaSolicitacaoModel)
  }
}

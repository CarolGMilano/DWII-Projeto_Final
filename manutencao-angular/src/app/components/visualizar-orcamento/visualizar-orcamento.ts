import { NgFor } from '@angular/common';
import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import {  ReactiveFormsModule, NgForm, FormsModule } from "@angular/forms";
import { SolicitacaoService } from '../../services/solicitacao';
import { SolicitacaoModel } from '../../models/solicitacao.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-visualizar-orcamento',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './visualizar-orcamento.html',
  styleUrl: './visualizar-orcamento.css'
})
export class VisualizarOrcamento implements OnInit{
  
  constructor(private dadosService:SolicitacaoService, private route: ActivatedRoute){}
  
  dados!: SolicitacaoModel;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    
    this.dadosService.getSolicitacao(id).subscribe(
      (data) => {
        this.dados = data;
      },
      (error) => {
        console.log("Erro ao buscar dados", error)
      }
    )
  }

  justificativa = '';

  showModal(modal: HTMLDialogElement) {
    modal.showModal();
  }

  closeModal(modal: HTMLDialogElement) {
    modal.close();
  }

  enviarRejeicao(modal: HTMLDialogElement, form: NgForm) {
    console.log('Justificativa:', this.justificativa);
    modal.close();
    form.resetForm();
  }

}

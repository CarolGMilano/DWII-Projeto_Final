import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { SharedModule, CepStatus, Cliente, Endereco, TipoUsuario } from '../../shared';
import { EnderecoService, ClienteService } from '../../services';
import { ElementoLoading, ElementoCard } from '../../components';

@Component({
  selector: 'app-tela-cadastro',
  imports: [CommonModule, FormsModule, RouterLink, SharedModule, ElementoLoading, ElementoCard],
  templateUrl: './tela-cadastro.html',
  styleUrl: './tela-cadastro.css'
})

export class TelaCadastro {
  @ViewChild('formCadastro') formCadastro! : NgForm;
  @ViewChild('card') card!: ElementoCard; 
  
  readonly _jsonEnderecoService = inject(EnderecoService);
  readonly clienteService = inject(ClienteService);
  private router = inject(Router);

  clientes: Cliente[] = [];

  endereco: Endereco = {
    cep: '',
    logradouro: '',
    numero: undefined,
    bairro: '',
    cidade: '',
    estado: '',
  };

  cliente: Cliente = {
    nome: '',
    email: '',
    tipo: TipoUsuario.CLIENTE,
    cpf: '',
    telefone: '',
    endereco: this.endereco
  };

  cepStatus: CepStatus = CepStatus.Vazio;
  status = CepStatus;
  
  loading: boolean = false;
  mensagem: string = '';
  corDoCard: string = '';

  limpaEndereco() {
    this.endereco.logradouro = '';
    this.endereco.numero = undefined;
    this.endereco.bairro = '';
    this.endereco.cidade = '';
    this.endereco.estado = '';
  }

  validaCEP(cep: string) {
    //Se o CEP for nulo ou indefinido, limpa os campos e retorna.
    if(!cep) {
      this.limpaEndereco();
      this.cepStatus = CepStatus.Vazio;

      return;
    }

    //Se esse CEP tiver 8 digitos
    if(cep.length === 8) {
      //Faz a requisição para a API ViaCEP e retorna o resultado
      this._jsonEnderecoService.getEndereco(cep).subscribe({
        //Sucesso
        next: (response) => {
          if (response && response.logradouro) {
            this.endereco.logradouro = response.logradouro;
            this.endereco.bairro = response.bairro;
            this.endereco.cidade = response.localidade;
            this.endereco.estado = response.estado;
            this.cepStatus = CepStatus.Valido;
          } else {
            this.limpaEndereco();
            this.cepStatus = CepStatus.Invalido;
          }
        },
        //Erro
        error: () => {
          this.limpaEndereco();
          this.cepStatus = CepStatus.ProblemaAPI;
        }
      });
    } else {
      this.limpaEndereco();
      this.cepStatus = CepStatus.Incompleto;
    }
  }
  
  salvar(){
    if (!this.formCadastro.form.valid) return;

    this.loading = true;

    const cliente: Cliente = {
      id: -1,
      nome: this.cliente.nome,
      email: this.cliente.email,
      tipo: this.cliente.tipo,
      cpf: this.cliente.cpf,
      telefone: this.cliente.telefone,
      endereco: {
        cep: this.endereco.cep,
        logradouro: this.cliente.endereco.logradouro,
        numero: this.cliente.endereco.numero,
        bairro: this.cliente.endereco.bairro,
        cidade: this.cliente.endereco.cidade,
        estado: this.cliente.endereco.estado,
      }
    }

    this.clienteService.inserir(cliente).subscribe({
      next: (resposta) => {
        this.loading = false;

        this.mensagem = 'Cadastro realizado com sucesso!'
        this.corDoCard = "#B6CEB4";
        this.card.exibir(4000, () => this.router.navigate(['']));
      },
      error: (erro) => {
        if (erro.status === 409) {
          this.loading = false;

          this.mensagem = `Conflito: ${erro.error}`;
          this.corDoCard = "#C70003";
          this.card.exibir();
        } else if (erro.status === 500) {
          this.loading = false;

          this.mensagem = `Erro interno: ${erro.error}`;
          this.corDoCard = "#C70003";
          this.card.exibir();
        } else {
          this.loading = false;

          this.mensagem = `Erro inesperado ao cadastrar cliente.`;
          this.corDoCard = "#C70003";
          this.card.exibir();
        }
      }
    });
  }
}
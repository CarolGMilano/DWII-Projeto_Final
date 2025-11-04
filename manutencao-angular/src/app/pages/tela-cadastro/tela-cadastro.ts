import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { SharedModule, CepStatus, Cliente, Endereco, TipoUsuario, Usuario } from '../../shared';
import { EnderecoService, ClienteService } from '../../services';

@Component({
  selector: 'app-tela-cadastro',
  imports: [CommonModule, FormsModule, RouterLink, SharedModule],
  templateUrl: './tela-cadastro.html',
  styleUrl: './tela-cadastro.css'
})

export class TelaCadastro {
  @ViewChild('formCadastro') formCadastro! : NgForm;
  
  readonly _jsonEnderecoService = inject(EnderecoService);
  readonly clienteService = inject(ClienteService);
  private router = inject(Router);

  clientes: Cliente[] = [];

  usuario: Usuario = {
    nome: '',
    email: '',
    senha: '',
    tipo: TipoUsuario.CLIENTE
  };

  endereco: Endereco = {
    cep: '',
    logradouro: '',
    numero: undefined,
    bairro: '',
    cidade: '',
    estado: '',
  };

  cliente: Cliente = {
    usuario: this.usuario,
    cpf: '',
    telefone: '',
    endereco: this.endereco
  };

  cepStatus: CepStatus = CepStatus.Vazio;
  status = CepStatus;

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
    
    //Senha aleatória para teste sem backend
    const senhaAleatoria = Math.random().toString(36).slice(-4);

    const cliente: Cliente = {
      usuario: {
        nome: this.cliente.usuario.nome,
        email: this.cliente.usuario.email,
        senha: senhaAleatoria,
        tipo: this.cliente.usuario.tipo
      },
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
      next: () => {
        console.log('Cliente cadastrado com sucesso!');
        this.router.navigate(['']);
      }
    });
  }
}
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CepStatus, Cliente, Endereco, TipoUsuario } from '../../models';
import { EnderecoService } from '../../services';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tela-cadastro',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './tela-cadastro.html',
  styleUrl: './tela-cadastro.css'
})

export class TelaCadastro {
  readonly _jsonEnderecoService = inject(EnderecoService);

  cliente: Cliente = {
    email: '',
    senha: '',
    tipo: TipoUsuario.CLIENTE,
    nome: '',
    cpf: '',
    telefone: '',
  };

  endereco: Endereco = {
    cep: '',
    logradouro: '',
    numero: '',
    bairro: '',
    cidade: '',
    estado: '',
  }

  cepStatus: CepStatus = CepStatus.Vazio;
  status = CepStatus;

  removeNaoNumericos(entrada: string): string {
    return entrada.replace(/\D/g, '');  
  }

  somenteNumeros(event: KeyboardEvent) {
    const char = event.key;
    
    //Se não for número, bloqueia
    if (!/[0-9]/.test(char)) {
      //Impede que o caractere seja adicionado
      event.preventDefault(); 
    }
  }

  mascaraCPF() {
      //Se o campo estiver vazio ou indefinido, retorna.
      if (!this.cliente.cpf) return;

    //Copia o campo para poder fazer conversões
    let cpf = this.removeNaoNumericos(this.cliente.cpf);

      //Limita a entrada do campo para 11 caractéres
      cpf = cpf.substring(0, 11);

      //Aplica a máscara: Serão 4 grupos, os três primeiros divididos por . e os dois últimos por -.
      cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
      cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
      cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

      //Atualiza o valor direto na variável cliente.cpf.
      this.cliente.cpf = cpf;
  } 

  mascaraTelefone() {
      if (!this.cliente.telefone) return;

    let telefone = this.removeNaoNumericos(this.cliente.telefone);

      telefone = telefone.substring(0, 11);

      telefone = telefone.replace(/(\d{2})(\d)/, '($1) $2');
      telefone = telefone.replace(/(\d{5})(\d)/, '$1-$2');

      this.cliente.telefone = telefone;
  }

  mascaraCEP() {
      if (!this.endereco.cep) return;

    let cep = this.removeNaoNumericos(this.endereco.cep);

      cep = cep.substring(0, 8);

      cep = cep.replace(/(\d{5})(\d)/, '$1-$2');

      this.endereco.cep = cep;
  }

  limpaEndereco() {
    this.endereco.logradouro = '';
    this.endereco.numero = '';
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

    //Retira tudo que não é número
    const cepFormatado = this.removeNaoNumericos(cep);

    //Se esse CEP formatado tiver 8 digitos
    if(cepFormatado.length === 8) {
      //Faz a requisição para a API ViaCEP e retorna o resultado
      this._jsonEnderecoService.getEndereco(cepFormatado).subscribe({
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

  cadastrar(){
    const cpfFormatado = this.removeNaoNumericos(this.cliente.cpf);
    const telefoneFormatado = this.removeNaoNumericos(this.cliente.telefone);
    const cepFormatado = this.removeNaoNumericos(this.endereco.cep);
    
    //Senha aleatória para teste sem backend
    const senhaAleatoria = Math.random().toString(36).slice(-4);

    const cliente: Cliente = {
      email: this.cliente.email,
      senha: senhaAleatoria,
      tipo: this.cliente.tipo,
      nome: this.cliente.nome,
      cpf: cpfFormatado,
      telefone: telefoneFormatado
    }

    const endereco: Endereco = {
      cep: cepFormatado,
      logradouro: this.endereco.logradouro,
      numero: this.endereco.numero,
      bairro: this.endereco.bairro,
      cidade: this.endereco.cidade,
      estado: this.endereco.estado,
    }

    console.log(cliente, endereco);
  }
}
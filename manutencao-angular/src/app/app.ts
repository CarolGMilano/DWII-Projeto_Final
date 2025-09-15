import { Component, inject, signal} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ClienteService, FuncionarioService } from './services';
import { Cliente, Funcionario, TipoUsuario } from './models';
import { MatIconModule } from '@angular/material/icon';

  const clientesFake: Cliente[] = [
    {
      usuario: { email: 'ana.silva@email.com', senha: 'senha123', tipo: TipoUsuario.CLIENTE },
      nome: 'Ana Silva',
      cpf: '12345678900',
      telefone: '11912345678',
      endereco: { cep: '01001000', logradouro: 'Praça da Sé', numero: '100', bairro: 'Sé', cidade: 'São Paulo', estado: 'SP' }
    },
    {
      usuario: { email: 'bruno.santos@email.com', senha: 'senha123', tipo: TipoUsuario.CLIENTE },
      nome: 'Bruno Santos',
      cpf: '23456789011',
      telefone: '21923456789',
      endereco: { cep: '20040020', logradouro: 'Rua da Carioca', numero: '200', bairro: 'Centro', cidade: 'Rio de Janeiro', estado: 'RJ' }
    },
    {
      usuario: { email: 'carla.martins@email.com', senha: 'senha123', tipo: TipoUsuario.CLIENTE },
      nome: 'Carla Martins',
      cpf: '34567890122',
      telefone: '31934567890',
      endereco: { cep: '30110000', logradouro: 'Avenida Afonso Pena', numero: '300', bairro: 'Centro', cidade: 'Belo Horizonte', estado: 'MG' }
    },
    {
      usuario: { email: 'daniel.oliveira@email.com', senha: 'senha123', tipo: TipoUsuario.CLIENTE },
      nome: 'Daniel Oliveira',
      cpf: '45678901233',
      telefone: '41945678901',
      endereco: { cep: '80010000', logradouro: 'Rua XV de Novembro', numero: '400', bairro: 'Centro', cidade: 'Curitiba', estado: 'PR' }
    },
    {
      usuario: { email: 'eliane.rodrigues@email.com', senha: 'senha123', tipo: TipoUsuario.CLIENTE },
      nome: 'Eliane Rodrigues',
      cpf: '56789012344',
      telefone: '51956789012',
      endereco: { cep: '90010000', logradouro: 'Rua dos Andradas', numero: '500', bairro: 'Centro', cidade: 'Porto Alegre', estado: 'RS' }
    },
    {
      usuario: { email: 'fernando.pereira@email.com', senha: 'senha123', tipo: TipoUsuario.CLIENTE },
      nome: 'Fernando Pereira',
      cpf: '67890123455',
      telefone: '61967890123',
      endereco: { cep: '70040000', logradouro: 'Setor Comercial Sul', numero: '600', bairro: 'Centro', cidade: 'Brasília', estado: 'DF' }
    },
    {
      usuario: { email: 'gabriela.gomes@email.com', senha: 'senha123', tipo: TipoUsuario.CLIENTE },
      nome: 'Gabriela Gomes',
      cpf: '78901234566',
      telefone: '71978901234',
      endereco: { cep: '40010000', logradouro: 'Avenida Sete de Setembro', numero: '700', bairro: 'Centro', cidade: 'Salvador', estado: 'BA' }
    },
    {
      usuario: { email: 'hugo.souza@email.com', senha: 'senha123', tipo: TipoUsuario.CLIENTE },
      nome: 'Hugo Souza',
      cpf: '89012345677',
      telefone: '81989012345',
      endereco: { cep: '50010000', logradouro: 'Rua da Aurora', numero: '800', bairro: 'Boa Vista', cidade: 'Recife', estado: 'PE' }
    },
    {
      usuario: { email: 'isabela.lima@email.com', senha: 'senha123', tipo: TipoUsuario.CLIENTE },
      nome: 'Isabela Lima',
      cpf: '90123456788',
      telefone: '85998123456',
      endereco: { cep: '60010000', logradouro: 'Avenida Beira Mar', numero: '900', bairro: 'Meireles', cidade: 'Fortaleza', estado: 'CE' }
    }
  ];

  const funcionariosFake: Funcionario[] = [
    {
      usuario: { email: 'ana.oliveira@email.com', senha: 'senha123', tipo: TipoUsuario.FUNCIONARIO },
      nome: 'Ana Oliveira',
      dataNascimento: new Date(1985, 3, 12)
    },
    {
      usuario: { email: 'bruno.lima@email.com', senha: 'senha123', tipo: TipoUsuario.FUNCIONARIO },
      nome: 'Bruno Lima',
      dataNascimento: new Date(1990, 7, 21)
    },
    {
      usuario: { email: 'carla.souza@email.com', senha: 'senha123', tipo: TipoUsuario.FUNCIONARIO },
      nome: 'Carla Souza',
      dataNascimento: new Date(1988, 1, 5)
    },
    {
      usuario: { email: 'daniel.martins@email.com', senha: 'senha123', tipo: TipoUsuario.FUNCIONARIO },
      nome: 'Daniel Martins',
      dataNascimento: new Date(1992, 12, 17)
    },
    {
      usuario: { email: 'eliane.pereira@email.com', senha: 'senha123', tipo: TipoUsuario.FUNCIONARIO },
      nome: 'Eliane Pereira',
      dataNascimento: new Date(1987, 9, 30)
    },
    {
      usuario: { email: 'fernando.gomes@email.com', senha: 'senha123', tipo: TipoUsuario.FUNCIONARIO },
      nome: 'Fernando Gomes',
      dataNascimento: new Date(1989, 5, 25)
    },
    {
      usuario: { email: 'gabriela.melo@email.com', senha: 'senha123', tipo: TipoUsuario.FUNCIONARIO },
      nome: 'Gabriela Melo',
      dataNascimento: new Date(1991, 2, 13)
    },
    {
      usuario: { email: 'hugo.silva@email.com', senha: 'senha123', tipo: TipoUsuario.FUNCIONARIO },
      nome: 'Hugo Silva',
      dataNascimento: new Date(1986, 8, 19)
    },
    {
      usuario: { email: 'isabela.ferreira@email.com', senha: 'senha123', tipo: TipoUsuario.FUNCIONARIO },
      nome: 'Isabela Ferreira',
      dataNascimento: new Date(1993, 4, 2)
    },
    {
      usuario: { email: 'joao.melo@email.com', senha: 'senha123', tipo: TipoUsuario.FUNCIONARIO },
      nome: 'João Melo',
      dataNascimento: new Date(1984, 6, 15)
    }
    
  ];

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatIconModule,
    RouterModule,
],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  //Populando o LocalStorage para testes
  readonly clienteService = inject(ClienteService);
  readonly funcionarioService = inject(FuncionarioService);
  protected readonly title = signal('manutencao-angular');

  constructor(){
    const clientesExistentes = localStorage.getItem('clientes');
    const funcionariosExistentes = localStorage.getItem('funcionarios');

    if (!clientesExistentes || JSON.parse(clientesExistentes).length === 0) {
      clientesFake.forEach(cliente => {
        this.clienteService.inserir(cliente);
      });
    }

    if (!funcionariosExistentes || JSON.parse(funcionariosExistentes).length === 0) {
      funcionariosFake.forEach(funcionario => {
        this.funcionarioService.inserir(funcionario);
      });
    }
  }
}

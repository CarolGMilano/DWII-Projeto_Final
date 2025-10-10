import { Endereco, Usuario } from './index';

export interface Cliente {
  idCliente?: number; //Opcional, pois o ID vem do banco
  usuario: Usuario; //Referência ao usuário correspondente 
  nome: string;
  cpf: string;
  telefone: string;
  endereco: Endereco; //Referência ao endereço correspondente
}
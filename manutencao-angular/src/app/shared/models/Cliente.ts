import { Endereco, Usuario } from './index';

export interface Cliente {
  usuario: Usuario; //Referência ao usuário correspondente 
  id?: number; //Opcional, pois o ID vem do banco
  cpf: string;
  telefone: string;
  endereco: Endereco; //Referência ao endereço correspondente
}
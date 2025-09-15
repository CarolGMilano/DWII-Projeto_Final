import { Endereco } from './Endereco';

export interface ClienteResumo {
  idCliente?: number; 
  nome: string;
  cpf: string;
  telefone: string;
  endereco: Endereco; 
}
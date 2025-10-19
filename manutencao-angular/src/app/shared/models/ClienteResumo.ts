import { Endereco } from './Endereco';

export interface ClienteResumo {
  id?: number; 
  nome: string;
  cpf: string;
  telefone: string;
  endereco: Endereco; 
}
import { Endereco } from './index';

export interface Cliente {
  id?: number; //Opcional, pois o ID vem do banco
  nome: string;
  email: string;
  tipo?: number;
  cpf: string;
  telefone: string;
  endereco: Endereco; //Referência ao endereço correspondente
}
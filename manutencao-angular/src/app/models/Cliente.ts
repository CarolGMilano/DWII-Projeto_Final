import { Usuario } from './Usuario';

export interface Cliente extends Usuario {
  nome: string;
  cpf: string;
  telefone: string;
  idEndereco?: number;
}
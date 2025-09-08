import { Usuario } from './Usuario.model';

export interface Cliente extends Usuario {
  nome: string;
  cpf: string;
  telefone: string;
  idEndereco?: number;
}
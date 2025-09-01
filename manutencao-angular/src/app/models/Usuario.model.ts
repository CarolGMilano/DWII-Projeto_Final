import { TipoUsuario } from './EnumTipoUsuario.model';

export interface Usuario {
  idUsuario?: number;
  email: string;
  senha: string;
  tipo?: TipoUsuario;
}
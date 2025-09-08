import { TipoUsuario } from './EnumTipoUsuario';

export interface Usuario {
  idUsuario?: number;
  email: string;
  senha: string;
  tipo?: TipoUsuario;
}
import { TipoUsuario } from './EnumTipoUsuario';

export interface Usuario {
  idUsuario?: number; //Opcional, pois o ID vem do banco
  email: string;
  senha: string;
  tipo?: TipoUsuario;
}
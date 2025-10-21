import { Usuario } from "./Usuario";

export interface Funcionario {
  id?: number; //Opcional, pois o ID vem do banco
  usuario: Usuario;
  dataNascimento: Date;
}
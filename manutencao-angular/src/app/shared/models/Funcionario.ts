import { Usuario } from "./Usuario";

export interface Funcionario {
  usuario: Usuario;
  id?: number; //Opcional, pois o ID vem do banco
  dataNascimento: Date;
}
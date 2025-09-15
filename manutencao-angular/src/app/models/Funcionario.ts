import { Usuario } from "./Usuario";

export interface Funcionario {
  idFuncionario?: number; //Opcional, pois o ID vem do banco
  usuario: Usuario;
  nome: string;
  dataNascimento: Date;
}
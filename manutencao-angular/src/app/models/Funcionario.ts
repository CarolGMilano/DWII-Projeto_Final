import { Usuario } from "./Usuario";

export interface Funcionario extends Usuario {
  nome: string,
  dataNascimento: Date
}
import { Usuario } from "./Usuario.model";

export interface Funcionario extends Usuario {
  dataNascimento: Date
}
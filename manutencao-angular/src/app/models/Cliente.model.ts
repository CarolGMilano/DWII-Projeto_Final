import { Usuario } from "./Usuario.model";

export interface Cliente extends Usuario {
  cpf: string,
  telefone: string,
}
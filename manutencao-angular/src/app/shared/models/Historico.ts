import { Funcionario } from "./index";

export interface Historico {
  id?: number; //
  idSolicitacao?: number; //
  dataHora: Date;
  status: number;
  funcionario?: Funcionario;
  funcionarioDestino?: Funcionario;
}
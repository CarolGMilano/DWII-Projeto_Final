import { FuncionarioResumo } from "./index";

export interface Historico {
  dataHora: Date;
  status: number;
  funcionario?: FuncionarioResumo;
  funcionarioDestino?: FuncionarioResumo;
  msgRejeicao?: String;
}
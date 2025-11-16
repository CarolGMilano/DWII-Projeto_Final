import { ClienteResumo } from "./ClienteResumo";
import { FuncionarioResumo } from "./FuncionarioResumo";

export interface SolicitacaoResumo {
  id?: number;
  descricao?: string;
  equipamento: string;
  status: number;
  dataAbertura: Date;
  funcionario?: FuncionarioResumo;
  cliente: ClienteResumo;
}
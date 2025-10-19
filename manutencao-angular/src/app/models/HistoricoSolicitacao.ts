import { EstadoSolicitacao } from "./EnumEstadoSolicitacao";

export interface HistoricoSolicitacao {
  idSolicitacao: number;
  dataHora: Date;
  estado: string;
  funcionario: string;
  observacao?: string;
}

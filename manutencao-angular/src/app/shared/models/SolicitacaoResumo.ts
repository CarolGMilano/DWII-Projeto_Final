import { ClienteResumo } from "./ClienteResumo";

export interface SolicitacaoResumo {
  id?: number;
  equipamento: string;
  status: number;
  dataAbertura: Date;
  cliente: ClienteResumo;
}
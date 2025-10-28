import { Servico } from "./Servico";

export interface Orcamento {
  id?: number;//
  idSolicitacao?: number;//
  servico?: Servico[];
  valorTotal: number;
  aprovada: boolean;
  msgRejeicao?: string
}
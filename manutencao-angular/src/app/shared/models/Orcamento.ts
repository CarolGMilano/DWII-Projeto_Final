import { Servico } from "./Servico";

export interface Orcamento {
  servicos?: Servico[];
  valorTotal: number;
  aprovada?: boolean;
  msgRejeicao?: string
}
import { Data } from "@angular/router";
import { EstadoSolicitacao } from "./EnumEstadoSolicitacao";
import { NovaSolicitacaoModel } from "./NovaSolicitacao";
import { OrcamentoModel } from "./Orcamento";

export interface SolicitacaoModel extends NovaSolicitacaoModel {
  id: number
  descricaoPreco?: Array<{ descricao: string; preco: number }>;
  precoTotal?: number;
  pago: false;
  data:Data;
  rejOrcamento?: string;
}

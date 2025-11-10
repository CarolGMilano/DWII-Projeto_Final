import { Data } from "@angular/router";
import { EstadoSolicitacao } from "./EnumEstadoSolicitacao";
import { NovaSolicitacaoModel } from "./NovaSolicitacao";
import { OrcamentoModel } from "./Orcamento";
import { Categoria } from "./Categoria";

export interface SolicitacaoModel {
  id: number;
  equipamento: string;
  categoria: Categoria;
  descricao: string;
  status: EstadoSolicitacao;
  funcionario: number;
  cliente: number;
}

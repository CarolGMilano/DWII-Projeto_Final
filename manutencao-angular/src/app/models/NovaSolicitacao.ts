import { Categoria } from "./Categoria";
import { EstadoSolicitacao } from "./EnumEstadoSolicitacao";

export interface NovaSolicitacaoModel{
    equipamento: string;
    categoria: number;
    descricao: string;
    status: EstadoSolicitacao;
    cliente: { id: number };
    funcionario?: { id: number } | null;
}
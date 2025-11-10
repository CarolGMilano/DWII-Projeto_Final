import { Categoria } from "./Categoria";
import { EstadoSolicitacao } from "./EnumEstadoSolicitacao";

export interface NovaSolicitacaoModel{
    equipamento: string;
    categoria: Categoria;
    descricao: string;
    status: EstadoSolicitacao;
    cliente: number;
}
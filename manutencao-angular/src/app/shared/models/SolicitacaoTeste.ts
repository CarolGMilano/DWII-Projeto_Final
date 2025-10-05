import { Categoria } from "../../models/Categoria";
import { ClienteResumo } from "./ClienteResumo";
import { Funcionario } from "./Funcionario";

export enum EstadoSolicitacaoT {
  ABERTA = 1,
  ORCADA,
  APROVADA,
  REJEITADA,
  REDIRECIONADA,
  ARRUMADA,
  PAGA,
  FINALIZADA
}

export const EstadoSolicitacaoLabel = {
  [EstadoSolicitacaoT.ABERTA]: 'Aberta',
  [EstadoSolicitacaoT.ORCADA]: 'Orçada',
  [EstadoSolicitacaoT.APROVADA]: 'Aprovada',
  [EstadoSolicitacaoT.REJEITADA]: 'Rejeitada',
  [EstadoSolicitacaoT.REDIRECIONADA]: 'Redirecionada',
  [EstadoSolicitacaoT.ARRUMADA]: 'Arrumada',
  [EstadoSolicitacaoT.PAGA]: 'Paga',
  [EstadoSolicitacaoT.FINALIZADA]: 'Finalizada',
};

export const EstadoSolicitacaoCor = {
  [EstadoSolicitacaoT.ABERTA]: '#B7B7B7',
  [EstadoSolicitacaoT.ORCADA]: '#AB886D',
  [EstadoSolicitacaoT.APROVADA]: '#DED473',
  [EstadoSolicitacaoT.REJEITADA]: '#BD574E',
  [EstadoSolicitacaoT.REDIRECIONADA]: '#BFA2DB',
  [EstadoSolicitacaoT.ARRUMADA]: '#89A8B2',
  [EstadoSolicitacaoT.PAGA]: '#F5B17B',
  [EstadoSolicitacaoT.FINALIZADA]: '#96A78D',
};

export interface ServicoT {
  idServico?: number;
  idSolicitacao?: number;
  descricao: string;
  preco: number
}

export interface HistoricoT {
  idHistorico?: number;
  idSolicitacao?: number;
  dataHora: Date;
  estado: EstadoSolicitacaoT;
  funcionario?: Funcionario;
  funcionarioDestino?: Funcionario;
  observacao?: string;
}

export interface OrcamentoT {
  idOrcamento?: number;
  idSolicitacao?: number;
  servico?: ServicoT[];
  valorTotal: number;
  aprovada: boolean;
  msgRejei?: string
}

export interface ManutencaoT {
  idManutencao?: number;
  idSolicitacao?: number;
  descricao: string;
  orientacoes: String;
  funcionario?: Funcionario;
}

export interface SolicitacaoDetalhe {
  idSolicitacao?: number;
  equipamento: string;
  categoria: Categoria;
  descricao: string;
  status: EstadoSolicitacaoT;
  historico: HistoricoT[];
  orcamento: OrcamentoT | null;
  manutencao: ManutencaoT | null;
  funcionario: Funcionario | null;
  cliente: ClienteResumo;
}
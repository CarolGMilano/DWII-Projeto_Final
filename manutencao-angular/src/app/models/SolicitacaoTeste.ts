import { NovaSolicitacao } from "../components/nova-solicitacao/nova-solicitacao";
import { Categoria } from "./Categoria";
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
  [EstadoSolicitacaoT.ABERTA]: 'bg-gray-300 text-gray-800',
  [EstadoSolicitacaoT.ORCADA]: 'bg-yellow-800 text-white',
  [EstadoSolicitacaoT.APROVADA]: 'bg-yellow-300 text-black',
  [EstadoSolicitacaoT.REJEITADA]: 'bg-red-500 text-white',
  [EstadoSolicitacaoT.REDIRECIONADA]: 'bg-purple-500 text-white',
  [EstadoSolicitacaoT.ARRUMADA]: 'bg-blue-500 text-white',
  [EstadoSolicitacaoT.PAGA]: 'bg-orange-500 text-white',
  [EstadoSolicitacaoT.FINALIZADA]: 'bg-green-500 text-white',
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
  orcamento?: OrcamentoT;
  manutencao?: ManutencaoT;
  funcionario?: Funcionario;
  cliente: ClienteResumo;
}
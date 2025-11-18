import { ClienteResumo, FuncionarioResumo, Historico, Manutencao, Orcamento } from "./index";

export interface Solicitacao {
  id?: number;
  equipamento: string;
  categoria: number;
  descricao: string;
  status: number;
  historico: Historico[];
  orcamento: Orcamento | null;
  manutencao: Manutencao | null;
  funcionario: FuncionarioResumo;
  cliente: ClienteResumo;
}
import { Categoria } from "../../models/Categoria";
import { ClienteResumo, Funcionario, Historico, Manutencao, Orcamento } from "./index";

export interface Solicitacao {
  id?: number;
  equipamento: string;
  categoria: Categoria;
  descricao: string;
  status: number;
  historico: Historico[];
  orcamento: Orcamento | null;
  manutencao: Manutencao | null;
  funcionario: Funcionario;
  cliente: ClienteResumo;
}
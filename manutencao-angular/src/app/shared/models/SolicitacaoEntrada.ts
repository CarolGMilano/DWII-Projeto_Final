import { Manutencao, Orcamento } from "./index";

export interface SolicitacaoEntrada {
  id?: number;
  equipamento?: string;
  categoria?: number;
  descricao?: string;
  orcamento?: Orcamento | null;
  manutencao?: Manutencao | null;
  funcionario?: number; 
  cliente?: number;     
}
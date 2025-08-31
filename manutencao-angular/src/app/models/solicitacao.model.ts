export interface SolicitacaoModel {
  id?: number;
  equipamento: string;
  categoria: string;
  descricao: string;
  data: Date;
  estado: string;
  descricaoPreco?: Array<{ descricao: string; preco: string }>;
  preco?: string;
}

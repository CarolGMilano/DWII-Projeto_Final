export interface SolicitacaoModel {
  id: number;
  equipamento: '';
  categoria: '';
  descricao: '';
  data: Date;
  estado: '';
  descricaoPreco?: Array<{ descricao: string; preco: string }>;
  preco?: '';
  pago: false;
}

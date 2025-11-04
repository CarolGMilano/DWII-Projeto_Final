export interface Endereco {
  id?: number; //Opcional, pois o ID vem do banco ()
  cep: string;
  logradouro: string;
  numero?: number;
  bairro: string;
  cidade: string;
  estado: string;
}
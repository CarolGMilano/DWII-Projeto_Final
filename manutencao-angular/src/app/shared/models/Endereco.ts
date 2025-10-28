export interface Endereco {
  id?: number; //Opcional, pois o ID vem do banco ()
  cep: string;
  logradouro: string;
  numero?: string; //Mudar para int
  bairro: string;
  cidade: string;
  estado: string;
}
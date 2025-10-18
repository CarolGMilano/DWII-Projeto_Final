export interface Usuario {
  id?: number; //Opcional, pois o ID vem do banco
  nome: string;
  email: string;
  senha: string;
  tipo?: number;
}
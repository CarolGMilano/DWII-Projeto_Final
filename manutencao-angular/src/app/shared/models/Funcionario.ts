export interface Funcionario {
  id: number; 
  nome: string;
  email: string;
  senha?: string;
  novaSenha?: string;
  tipo: number;
  dataNascimento: Date;
}
export enum TipoUsuario {
  CLIENTE = 1,
  FUNCIONARIO = 2
}

export const TipoUsuarioLabel = {
  [TipoUsuario.CLIENTE]: 'Cliente',
  [TipoUsuario.FUNCIONARIO]: 'Funcionário'
};
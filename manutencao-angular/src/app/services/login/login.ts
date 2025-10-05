import { Injectable } from '@angular/core';

import { Cliente, Funcionario, Usuario } from '../../shared';

const LS_USUARIO_LOGADO = "usuarioLogado";

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  login(email: string, senha: string): Cliente | Funcionario | null {
    //Recupera o que está na chave "LS_CLIENTES" e "LS_FUNCIONARIOS"
    const clientes: Cliente[] = JSON.parse(localStorage.getItem('clientes') || '[]');
    const funcionarios: Funcionario[] = JSON.parse(localStorage.getItem('funcionarios') || '[]');

    const clienteEncontrado = clientes.find(cliente => cliente.usuario?.email === email && cliente.usuario?.senha === senha);
    const funcionarioEncontrado = funcionarios.find(funcionario => funcionario.usuario?.email === email && funcionario.usuario?.senha === senha);

    const usuario = clienteEncontrado || funcionarioEncontrado || null;

    if (usuario) {
      localStorage[LS_USUARIO_LOGADO] = JSON.stringify(usuario);

      return usuario;
    }

    return null;
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { TipoUsuario } from '../../shared';
import { ClienteService, FuncionarioService, LoginService } from '../../services';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {
  private loginService = inject(LoginService);
  private clienteService = inject(ClienteService);
  private funcionarioService = inject(FuncionarioService);

  private router = inject(Router);

  usuarioLogado = this.loginService.usuarioLogado;
  TipoUsuario = TipoUsuario;

  nome: string = '';
  email: string = '';

  ngOnInit(): void {
    this.buscarDadosUsuario();
  }

  buscarDadosUsuario() {
    const usuario = this.usuarioLogado;

    if (!usuario) return;

    if (usuario.tipo === this.TipoUsuario.CLIENTE) {
      this.clienteService.buscarPorUsuario(usuario.id).subscribe({
        next: (cliente) => {
          if (cliente) {
            this.nome = cliente.nome;
            this.email = cliente.email;
          }
        },
        error: (erro) => console.error('Erro ao buscar cliente:', erro)
      });
    } else if (usuario.tipo === this.TipoUsuario.FUNCIONARIO) {
      this.funcionarioService.buscarPorUsuario(usuario.id).subscribe({
        next: (funcionario) => {
          if (funcionario) {
            this.nome = funcionario.nome;
            this.email = funcionario.email;
          }
        },
        error: (erro) => console.error('Erro ao buscar funcionário:', erro)
      });
    }
  }

  deslogar(){
    this.loginService.logout();
    this.router.navigate(['']);
  }
}

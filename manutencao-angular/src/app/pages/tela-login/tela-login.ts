import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

import { TipoUsuario, UsuarioStatus, Login } from '../../shared'
import { LoginService } from '../../services';

@Component({
  selector: 'app-tela-login',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './tela-login.html',
  styleUrl: './tela-login.css'
})

export class TelaLogin implements OnInit {
  @ViewChild('formLogin') formLogin! : NgForm;

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  readonly loginService = inject(LoginService);

  login: Login = {
    email: '',
    senha: ''
  }

  usuarioStatus: UsuarioStatus = UsuarioStatus.Nenhum;
  status = UsuarioStatus;

  loading: boolean = false;
  mensagem!: string;

  ngOnInit(): void {
    const usuario = this.loginService.usuarioLogado;

    if(usuario) {
      const rota = (
        usuario.tipo === TipoUsuario.CLIENTE 
          ? '/tela-inicial-cliente' 
          : '/tela-inicial-funcionario'
      );
    
      this.router.navigate([rota]);
    } else {
      this.route.queryParams.subscribe(params => {
        this.mensagem = params['error'];
      })
    }
  }

  aoMudarInput() {
    this.usuarioStatus = UsuarioStatus.Nenhum;
  }

  logar(){
    if (!this.formLogin.form.valid) return;

    this.loading = true;

    this.loginService.login(this.login).subscribe({
      next: (usuario) => {
        if(usuario != null) {
          this.loginService.usuarioLogado = usuario;
          this.loading = false;

          if (usuario.tipo === TipoUsuario.CLIENTE) {
            this.router.navigate(['/tela-inicial-cliente']);
            this.usuarioStatus = UsuarioStatus.Valido;
          } else if (usuario.tipo === TipoUsuario.FUNCIONARIO) {
            this.router.navigate(['/tela-inicial-funcionario']);
            this.usuarioStatus = UsuarioStatus.Valido;
          }
        }
      },
      error: (erro) => {
        this.loading = false;

        if (erro.status === 401 || erro.status === 404) {
          this.mensagem = erro.error;
          this.usuarioStatus = UsuarioStatus.Invalido;
        } else if (erro.status === 500) {
          this.mensagem = 'Erro interno no servidor.';
          this.usuarioStatus = UsuarioStatus.Invalido;
        } else {
          this.mensagem = 'Erro inesperado ao efetuar login.';
          this.usuarioStatus = UsuarioStatus.Invalido;
        }

        alert(this.mensagem);
      }
    });

    this.loading = false;
  }

  deslogar(){
    this.loginService.logout();
    this.router.navigate(['']);
  }
}
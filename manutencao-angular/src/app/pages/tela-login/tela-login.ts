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
    if(this.loginService.usuarioLogado) {
      if (this.loginService.usuarioLogado.tipo === TipoUsuario.CLIENTE) {
          this.router.navigate(['/tela-inicial-cliente']);
      } else if (this.loginService.usuarioLogado.tipo === TipoUsuario.FUNCIONARIO) {
        this.router.navigate(['/tela-inicial-funcionario']);
      } 
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

    this.loginService.login(this.login).subscribe(usuario => {
      if (usuario) {
        this.loginService.usuarioLogado = usuario;
        this.loading = false;

        if (usuario.tipo === TipoUsuario.CLIENTE) {
          this.router.navigate(['/tela-inicial-cliente']);
          this.usuarioStatus = UsuarioStatus.Valido;
        } else if (usuario.tipo === TipoUsuario.FUNCIONARIO) {
          this.router.navigate(['/tela-inicial-funcionario']);
          this.usuarioStatus = UsuarioStatus.Valido;
        }
      } else {
        this.mensagem = "Usuário/Senha inválidos."
        this.usuarioStatus = UsuarioStatus.Invalido;
      }
    })

    this.loading = false;
  }

  deslogar(){
    this.loginService.logout();
    this.router.navigate(['']);
  }
}
import { Component, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

import { TipoUsuario, UsuarioStatus, Login } from '../../shared'
import { LoginService } from '../../services';

@Component({
  selector: 'app-tela-login',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './tela-login.html',
  styleUrl: './tela-login.css'
})

export class TelaLogin {
  @ViewChild('formLogin') formLogin! : NgForm;

  private router = inject(Router);
  readonly loginService = inject(LoginService);

  loginAtual: Login = {
    email: '',
    senha: ''
  }

  usuarioStatus: UsuarioStatus = UsuarioStatus.Nenhum;
  status = UsuarioStatus;

  aoMudarInput() {
    this.usuarioStatus = UsuarioStatus.Nenhum;
  }

  login(){
    if (!this.formLogin.form.valid) return;

    this.loginService.login(this.loginAtual).subscribe(usuario => {
      if (usuario) {
        this.loginService.usuarioLogado = usuario;

        if (usuario.tipo === TipoUsuario.CLIENTE) {
          this.router.navigate(['/tela-inicial-cliente']);
          this.usuarioStatus = UsuarioStatus.Valido;
        } else if (usuario.tipo === TipoUsuario.FUNCIONARIO) {
          this.router.navigate(['/tela-inicial-funcionario']);
          this.usuarioStatus = UsuarioStatus.Valido;
        }
      } else {
        this.usuarioStatus = UsuarioStatus.Invalido;
      }
    })
  }

  logout(){
    this.loginService.logout();
    this.router.navigate(['']);
  }
}
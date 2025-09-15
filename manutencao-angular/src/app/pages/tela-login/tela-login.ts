import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Usuario, TipoUsuario, UsuarioStatus, Cliente, Funcionario } from '../../models'
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services';

const usuariosFake: Usuario[] = [
  { email: 'cliente@teste.com', senha: '1234', tipo: TipoUsuario.CLIENTE },
  { email: 'funcionario@teste.com', senha: '1234', tipo: TipoUsuario.FUNCIONARIO }
];

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

  usuario: Usuario = {
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

    let usuarioEncontrado: Cliente | Funcionario | null = this.loginService.login(this.usuario.email, this.usuario.senha);

    if (usuarioEncontrado != null) {
      if (usuarioEncontrado.usuario.tipo === TipoUsuario.CLIENTE) {
        this.router.navigate(['/tela-inicial-cliente']);
        this.usuarioStatus = UsuarioStatus.Valido;
      } else if (usuarioEncontrado.usuario.tipo === TipoUsuario.FUNCIONARIO) {
        this.router.navigate(['/tela-inicial-funcionario']);
        this.usuarioStatus = UsuarioStatus.Valido;
      }
    } else {
      this.usuarioStatus = UsuarioStatus.Invalido;
    }
  }
}

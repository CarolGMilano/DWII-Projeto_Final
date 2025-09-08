import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Usuario, TipoUsuario, UsuarioStatus } from '../../models'
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

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
  private router = inject(Router);

  usuario: Usuario = {
    email: '',
    senha: '',
  }

  usuarioStatus: UsuarioStatus = UsuarioStatus.Nenhum;
  status = UsuarioStatus;

  aoMudarInput() {
    this.usuarioStatus = UsuarioStatus.Nenhum;
  }

  login(){
    const usuarioLogado = usuariosFake.find(
      usuario => usuario.email === this.usuario.email && usuario.senha === this.usuario.senha
    );

    if (usuarioLogado) {
      if (usuarioLogado.tipo === TipoUsuario.CLIENTE) {
        this.router.navigate(['/tela-inicial-cliente']);
        this.usuarioStatus = UsuarioStatus.Valido;
      } else if (usuarioLogado.tipo === TipoUsuario.FUNCIONARIO) {
        console.log("Tela Funcionário");
        this.usuarioStatus = UsuarioStatus.Valido;

        //this.router.navigate(['/tela-inicial-funcionario']);
      }
    } else {
      console.error('Usuário ou senha inválidos');
      this.usuarioStatus = UsuarioStatus.Invalido;
    }
  }
}

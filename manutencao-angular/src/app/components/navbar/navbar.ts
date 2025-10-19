import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { TipoUsuario } from '../../shared';
import { LoginService } from '../../services';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  private loginService = inject(LoginService);
  private router = inject(Router);

  usuarioLogado = this.loginService.usuarioLogado;
  TipoUsuario = TipoUsuario;

  logout(){
    this.loginService.logout();
    this.router.navigate(['']);
  }
}

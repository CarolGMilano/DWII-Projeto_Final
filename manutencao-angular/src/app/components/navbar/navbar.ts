import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { TipoUsuario } from '../../shared';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado')!);
  TipoUsuario = TipoUsuario;
}

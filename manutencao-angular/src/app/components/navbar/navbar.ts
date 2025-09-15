import { Component } from '@angular/core';
import { TipoUsuario } from '../../models';
import { RouterLink } from '@angular/router';

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

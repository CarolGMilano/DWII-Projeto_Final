import { Component } from '@angular/core';

@Component({
  selector: 'app-submenu',
  imports: [],
  templateUrl: './submenu.html',
  styleUrl: './submenu.css'
})
export class Submenu {
  // tipoUsuario: string | null = localStorage.getItem('tipoUsuario');
  tipoUsuario: string | null = 'FUNCIONARIO';
}

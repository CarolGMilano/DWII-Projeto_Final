import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../../components';

@Component({
  selector: 'app-cliente-funcionario-layout',
  imports: [
    RouterOutlet,
    Navbar
  ],
  templateUrl: './cliente-funcionario-layout.html',
  styleUrl: './cliente-funcionario-layout.css'
})
export class ClienteFuncionarioLayout {

}

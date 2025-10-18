import { inject, Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Login, Usuario } from '../../shared';

const LS_USUARIO_LOGADO = "usuarioLogado";

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private readonly _httpClient = inject(HttpClient)
  
  BASE_URL = "http://localhost:3000/usuario";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  } 

  public get usuarioLogado(): Usuario | null {
    let usuario = localStorage[LS_USUARIO_LOGADO];

    return (usuario ? JSON.parse(localStorage[LS_USUARIO_LOGADO]) : null);
  }

  public set usuarioLogado(usuario: Usuario){
    localStorage[LS_USUARIO_LOGADO] = JSON.stringify(usuario);
  }

  login(login: Login): Observable<Usuario | null>{
    return this._httpClient.get<Usuario[]>(this.BASE_URL, this.httpOptions).pipe( map(lista => {
        let usuario = lista.find( u => 
          u.email === login.email &&
          u.senha === login.senha
        ) || null;

        if(usuario != undefined){
          return usuario;
        } else {
          return null;
        }
      })
    )
  }

  /*login(email: string, senha: string): Cliente | Funcionario | null {
    //Recupera o que está na chave "LS_CLIENTES" e "LS_FUNCIONARIOS"
    const clientes: Cliente[] = JSON.parse(localStorage.getItem('clientes') || '[]');
    const funcionarios: Funcionario[] = JSON.parse(localStorage.getItem('funcionarios') || '[]');

    const clienteEncontrado = clientes.find(cliente => cliente.usuario?.email === email && cliente.usuario?.senha === senha);
    const funcionarioEncontrado = funcionarios.find(funcionario => funcionario.usuario?.email === email && funcionario.usuario?.senha === senha);

    const usuario = clienteEncontrado || funcionarioEncontrado || null;

    if (usuario) {
      localStorage[LS_USUARIO_LOGADO] = JSON.stringify(usuario);

      return usuario;
    }

    return null;
  }*/

  logout(){
    delete localStorage[LS_USUARIO_LOGADO];
  }
}

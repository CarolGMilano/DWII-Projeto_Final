import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Login, UsuarioLogado } from '../../shared';

const LS_USUARIO_LOGADO = "usuarioLogado";

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private readonly _httpClient = inject(HttpClient)
  
  BASE_URL = "http://localhost:8080/login";

  httpOptions = {
    observe: "response" as "response",
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  } 

  public get usuarioLogado(): UsuarioLogado | null {
    let usuario = localStorage[LS_USUARIO_LOGADO];

    return (usuario ? JSON.parse(localStorage[LS_USUARIO_LOGADO]) : null);
  }

  public set usuarioLogado(usuario: UsuarioLogado){
    localStorage[LS_USUARIO_LOGADO] = JSON.stringify(usuario);
  }

  login(login: Login): Observable<UsuarioLogado | null>{
    return this._httpClient.post<UsuarioLogado>(
      this.BASE_URL, 
      JSON.stringify(login),
      this.httpOptions
    ).pipe( 
      map((resposta: HttpResponse<UsuarioLogado>) => {
        if(resposta.status == 200){
          return resposta.body;
        } else {
          return null;
        }
      }),
      catchError((erro) => {
        return throwError(() => erro);
      })
    )
  }

  logout(){
    delete localStorage[LS_USUARIO_LOGADO];
  }
}

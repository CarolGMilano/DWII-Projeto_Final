import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError, map, Observable, of, throwError } from 'rxjs';

import { Cliente } from '../../shared';

@Injectable({
  providedIn: 'root'
})

export class ClienteService {
  private readonly _httpClient = inject(HttpClient)
  
  BASE_URL = "http://localhost:8080/clientes";

  httpOptions = {
    observe: "response" as "response",
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
/*
  listarTodos(): Observable<Cliente[] | null> {
    return this._httpClient.get<Cliente[]>(this.BASE_URL, this.httpOptions).pipe(
      map((resposta: HttpResponse<Cliente[]>) => {
        if(resposta.status == 200){
          return resposta.body;
        } else {
          return [];
        }
      }), 
      catchError((erro, caught) => {
        if(erro.status == 404) {
          return of([]);
        } else {
          return throwError(() => erro);
        }
      })
    );
  }
*/
  inserir(cliente: Cliente): Observable<Cliente | null> {
    return this._httpClient.post<Cliente>(
      this.BASE_URL, 
      JSON.stringify(cliente), 
      this.httpOptions
    ).pipe(
      map((resposta: HttpResponse<Cliente>) => {
        if(resposta.status == 201){
          return resposta.body;
        } else {
          return null;
        }
      }), 
      catchError((erro) => {
        return throwError(() => erro);
      })
    );
  }

  buscarPorId(id: number): Observable<Cliente | null> {
    return this._httpClient.get<Cliente>(
      `${this.BASE_URL}/${id}`, 
      this.httpOptions
    ).pipe(
      map((resposta: HttpResponse<Cliente>) => {
        if(resposta.status == 200){
          return resposta.body;
        } else {
          return null;
        }
      }),
      catchError((erro) => {
        return throwError(() => erro);
      })
    );   
  }

  buscarPorUsuario(id: number): Observable<Cliente | null> {
    return this._httpClient.get<Cliente>(
      `${this.BASE_URL}/por-usuario?id=${id}`, 
      this.httpOptions
    ).pipe(
      map((resposta: HttpResponse<Cliente>) => {
        if(resposta.status == 200){
          return resposta.body;
        } else {
          return null;
        }
      }),
      catchError((erro) => {
        return throwError(() => erro);
      })
    );   
  }
}

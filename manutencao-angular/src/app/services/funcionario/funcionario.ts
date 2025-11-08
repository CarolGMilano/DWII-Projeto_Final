import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';

import { Funcionario } from '../../shared'; 

@Injectable({
  providedIn: 'root'
})

export class FuncionarioService {
  private readonly _httpClient = inject(HttpClient)
  
  BASE_URL = "http://localhost:8080/funcionarios";

  httpOptions = {
    observe: "response" as "response",
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  listarTodos(): Observable<Funcionario[] | null> {
    return this._httpClient.get<Funcionario[]>(
      this.BASE_URL, 
      this.httpOptions
    ).pipe(
      map((resposta: HttpResponse<Funcionario[]>) => {
        if(resposta.status == 200){
          return resposta.body;
        } else {
          return [];
        }
      }),
      catchError((erro) => {
        return throwError(() => erro);
      })
    );
  }

  inserir(funcionario: Funcionario): Observable<Funcionario | null> {
    return this._httpClient.post<Funcionario>(
      this.BASE_URL, 
      JSON.stringify(funcionario), 
      this.httpOptions
    ).pipe(
      map((resposta: HttpResponse<Funcionario>) => {
        if(resposta.status == 201){
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

  buscarPorId(id: number): Observable<Funcionario | null> {
    return this._httpClient.get<Funcionario>(
      `${this.BASE_URL}/${id}`, 
      this.httpOptions
    ).pipe(
      map((resposta: HttpResponse<Funcionario>) => {
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

  buscarPorUsuario(id: number): Observable<Funcionario | null> {
    return this._httpClient.get<Funcionario>(
      `${this.BASE_URL}/por-usuario?id=${id}`, 
      this.httpOptions
    ).pipe(
      map((resposta: HttpResponse<Funcionario>) => {
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

  atualizar(funcionario: Funcionario): Observable<Funcionario | null> {
    return this._httpClient.put<Funcionario>(
      `${this.BASE_URL}/${funcionario.id}`, 
      JSON.stringify(funcionario), 
      this.httpOptions
    ).pipe(
      map((resposta: HttpResponse<Funcionario>) => {
        if(resposta.status == 200) {
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

  remover(id: number): Observable<Funcionario | null> {
    return this._httpClient.delete<Funcionario>(
      `${this.BASE_URL}/${id}`, 
      this.httpOptions
    ).pipe(
      map((resposta: HttpResponse<Funcionario>) => {
        if(resposta.status == 200) {
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

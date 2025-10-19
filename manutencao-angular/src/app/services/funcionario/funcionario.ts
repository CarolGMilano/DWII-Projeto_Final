import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Funcionario } from '../../shared'; 

@Injectable({
  providedIn: 'root'
})

export class FuncionarioService {
  private readonly _httpClient = inject(HttpClient)
  
  BASE_URL = "http://localhost:3000/funcionario";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  listarTodos(): Observable<Funcionario[]> {
    return this._httpClient.get<Funcionario[]>(this.BASE_URL, this.httpOptions);
  }

  inserir(funcionario: Funcionario): Observable<Funcionario> {
    return this._httpClient.post<Funcionario>(this.BASE_URL, JSON.stringify(funcionario), this.httpOptions);
  }

  buscarPorId(id: number): Observable<Funcionario | undefined> {
    return this._httpClient.get<Funcionario>(`${this.BASE_URL}/${id}`, this.httpOptions);
  }

  atualizar(funcionario: Funcionario): Observable<Funcionario> {
    return this._httpClient.put<Funcionario>(`${this.BASE_URL}/${funcionario.id}`, JSON.stringify(funcionario), this.httpOptions);
  }

  remover(id: number): Observable<Funcionario> {
    return this._httpClient.delete<Funcionario>(`${this.BASE_URL}/${id}`, this.httpOptions);
  }
}

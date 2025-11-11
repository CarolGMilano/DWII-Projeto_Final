import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Solicitacao } from '../../shared';

@Injectable({
  providedIn: 'root'
})

export class SolicitacaoFakeService {
  private readonly _httpClient = inject(HttpClient)
  
  BASE_URL = "http://localhost:8080/solicitacoes";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  
  listarTodos(): Observable<Solicitacao[]> {
    return this._httpClient.get<Solicitacao[]>(this.BASE_URL, this.httpOptions);
  }


  inserir(solicitacao: Solicitacao): Observable<Solicitacao> {
    return this._httpClient.post<Solicitacao>(this.BASE_URL, JSON.stringify(solicitacao), this.httpOptions);
  }

  buscarPorId(id: number): Observable<Solicitacao> {
    return this._httpClient.get<Solicitacao>(`${this.BASE_URL}/${id}`, this.httpOptions);
  }

  atualizar(solicitacao: Solicitacao): Observable<Solicitacao>{
    return this._httpClient.put<Solicitacao>(`${this.BASE_URL}/${solicitacao.id}`, JSON.stringify(solicitacao), this.httpOptions);
  }
}

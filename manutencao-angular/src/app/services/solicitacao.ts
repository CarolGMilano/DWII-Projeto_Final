import { Injectable } from '@angular/core';
import { NovaSolicitacao } from '../components/nova-solicitacao/nova-solicitacao';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Solicitacao {
  private apiUrl = '';

  constructor(private http : HttpClient) {}

  postSolicitacao(solicitacao: NovaSolicitacao):Observable<NovaSolicitacao>{
    return this.http.post<NovaSolicitacao>(this.apiUrl, solicitacao)
  }

  getSolicitacoes():Observable<Solicitacao[]>{
    return this.http.get<Solicitacao[]>(this.apiUrl)
  }

  getSolicitacao(id: number): Observable<Solicitacao>{
    return this.http.get<Solicitacao>(`${this.apiUrl}/${id}`);
  }
}

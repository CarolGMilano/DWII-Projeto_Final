import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NovaSolicitacao } from '../../components/nova-solicitacao/nova-solicitacao';
import { SolicitacaoModel } from '../../models/Solicitacao.model';

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

  getSolicitacao(id: number): Observable<SolicitacaoModel>{
    return this.http.get<SolicitacaoModel>(`${this.apiUrl}/${id}`);
  }
}

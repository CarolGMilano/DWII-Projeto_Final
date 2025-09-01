import { Injectable } from '@angular/core';
import { NovaSolicitacao } from '../components/nova-solicitacao/nova-solicitacao';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SolicitacaoModel } from '../models/solicitacao.model';

@Injectable({
  providedIn: 'root'
})
export class SolicitacaoService {
  private apiUrl = '';

  constructor(private http : HttpClient) {}

  postSolicitacao(solicitacao: NovaSolicitacao):Observable<NovaSolicitacao>{
    return this.http.post<NovaSolicitacao>(this.apiUrl, solicitacao)
  }

  get Solicitacoes():Observable<SolicitacaoModel[]>{
    return this.http.get<SolicitacaoModel[]>(this.apiUrl)
    
  
  getSolicitacao(id: number): Observable<SolicitacaoModel>{
    return this.http.get<SolicitacaoModel>(`${this.apiUrl}/${id}`);
  }
}

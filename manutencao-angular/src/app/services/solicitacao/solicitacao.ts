import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SolicitacaoModel } from '../../models/solicitacao.model';
import { NovaSolicitacao } from '../../components/nova-solicitacao/nova-solicitacao';

@Injectable({
  providedIn: 'root'
})
export class SolicitacaoService {
  private apiUrl = '';

  constructor(private http : HttpClient) {}

  //depois será colocado o model Categoria
  // get categorias():Observable<Categoria[]>{
  //   return this.http.get<Categoria[]>(this.apiUrl + '/categorias');
  // }

  get categorias():Observable<[]>{
    return this.http.get<[]>(this.apiUrl + '/categorias');
  }

  postSolicitacao(solicitacao: NovaSolicitacao):Observable<NovaSolicitacao>{
    return this.http.post<NovaSolicitacao>(this.apiUrl, solicitacao)
  }

  get Solicitacoes():Observable<SolicitacaoModel[]>{
    return this.http.get<SolicitacaoModel[]>(this.apiUrl)
    
  }

  getSolicitacao(id: number): Observable<SolicitacaoModel>{
    return this.http.get<SolicitacaoModel>(`${this.apiUrl}/${id}`);
  }

  atualizarStatus(id: number, novoEstado: string): Observable<SolicitacaoModel> {
    return this.http.put<SolicitacaoModel>(`${this.apiUrl}/${id}`, {
      estado: novoEstado
    });
  }

  pagarServico(id:number): Observable<SolicitacaoModel>{
   return this.http.put<SolicitacaoModel>(`${this.apiUrl}/${id}`, {
      pago: true
    });
  }
 
}

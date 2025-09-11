import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SolicitacaoModel } from '../../models/Solicitacao';
import { NovaSolicitacao } from '../../components/nova-solicitacao/nova-solicitacao';
import { OrcamentoModel } from '../../models/Orcamento';
import { Categoria } from '../../models/Categoria';
import { EstadoSolicitacao } from '../../models/EnumEstadoSolicitacao';
import { HistoricoSolicitacao } from '../../models/HistoricoSolicitacao';

@Injectable({
  providedIn: 'root'
})
export class SolicitacaoService {
  private apiUrl = '';

  constructor(private http : HttpClient) {}

  get categorias():Observable<Categoria[]>{
    return this.http.get<Categoria[]>(this.apiUrl + '/categorias');
  }

  postSolicitacao(solicitacao: NovaSolicitacao):Observable<NovaSolicitacao>{
    return this.http.post<NovaSolicitacao>(this.apiUrl, solicitacao)
  }

  getSolicitacoes():Observable<SolicitacaoModel[]>{
    return this.http.get<SolicitacaoModel[]>(this.apiUrl)
  }

  getSolicitacao(id: number): Observable<SolicitacaoModel>{
    return this.http.get<SolicitacaoModel>(`${this.apiUrl}/${id}`);
  }
  
  getHistorico(id: number): Observable<HistoricoSolicitacao[]>{
    return this.http.get<HistoricoSolicitacao[]>(`${this.apiUrl}/historico/${id}`);
  }

  atualizarStatus(id: number, novoEstado: EstadoSolicitacao, motivo?: string): Observable<SolicitacaoModel> {
    return this.http.put<SolicitacaoModel>(`${this.apiUrl}/${id}/estado`, {
      estado: novoEstado,
      rejOrcamento: motivo
    });
  }

  pagarServico(id:number): Observable<SolicitacaoModel>{
   return this.http.put<SolicitacaoModel>(`${this.apiUrl}/${id}`, {
      pago: true
    });
  }

}

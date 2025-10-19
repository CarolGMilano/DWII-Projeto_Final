import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SolicitacaoModel } from '../../models/Solicitacao';
import { NovaSolicitacao } from '../../components/nova-solicitacao/nova-solicitacao';
import { Categoria } from '../../models/Categoria';
import { EstadoSolicitacao } from '../../models/EnumEstadoSolicitacao';
import { HistoricoSolicitacao } from '../../models/HistoricoSolicitacao';
import { NovaSolicitacaoModel } from '../../models/NovaSolicitacao';

@Injectable({
  providedIn: 'root'
})

export class SolicitacaoService {
  private apiUrl = '';

  constructor(private http : HttpClient) {}

  get categorias():Observable<Categoria[]>{
    return this.http.get<Categoria[]>(this.apiUrl + '/categorias');
  }

  postSolicitacao(novaSolicitacao: NovaSolicitacaoModel):Observable<NovaSolicitacaoModel>{
    return this.http.post<NovaSolicitacaoModel>(this.apiUrl, novaSolicitacao)
  }

  getSolicitacoes():Observable<SolicitacaoModel[]>{
    return this.http.get<SolicitacaoModel[]>(this.apiUrl)
  }

  getSolicitacao(solicitacao: SolicitacaoModel): Observable<SolicitacaoModel>{
    return this.http.get<SolicitacaoModel>(`${this.apiUrl}/${solicitacao.id}`);
  }
  
  getHistorico(historico: HistoricoSolicitacao): Observable<HistoricoSolicitacao[]>{
    return this.http.get<HistoricoSolicitacao[]>(`${this.apiUrl}/historico/${historico.idSolicitacao}`);
  }

  atualizarStatus(solicitacao:SolicitacaoModel, novoEstado: EstadoSolicitacao, motivo?: string): Observable<SolicitacaoModel> {
    return this.http.put<SolicitacaoModel>(`${this.apiUrl}/${solicitacao.id}}/estado`, {
      estado: novoEstado,
      rejOrcamento: motivo
    });
  }

  pagarServico(solicitacao: SolicitacaoModel): Observable<SolicitacaoModel>{
   return this.http.put<SolicitacaoModel>(`${this.apiUrl}/${solicitacao.id}`, {
      pago: true
    });
  }

  enviarOrcamento(solicitacao: SolicitacaoModel, precoTotal: number, descricaoPreco: {descricao: string; preco: number} ): Observable<SolicitacaoModel> {
    this.atualizarStatus(solicitacao, EstadoSolicitacao.ORCADA);
    
    return this.http.put<SolicitacaoModel>(`${this.apiUrl}/${solicitacao.id}/orcamento`, {
      precoTotal: precoTotal,
      descricaoPreco : descricaoPreco
      
    });
  }

}

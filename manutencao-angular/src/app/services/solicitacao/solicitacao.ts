import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
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
  // private apiUrl = '';
  BASE_URL = "http://localhost:8080/solicitacoes";

  httpOptions = {
    observe: "response" as "response",
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  get categorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.BASE_URL + '/categorias');
  }

  postSolicitacao(novaSolicitacao: NovaSolicitacaoModel): Observable<NovaSolicitacaoModel  | null> {
    return this.http.post<NovaSolicitacaoModel>(this.BASE_URL, novaSolicitacao)
  }

  getSolicitacoes(): Observable<SolicitacaoModel[]> {
    return this.http.get<SolicitacaoModel[]>(
      this.BASE_URL, 
      this.httpOptions).pipe(
        map((resp: HttpResponse<SolicitacaoModel[]>) => {
          return resp.body ?? [];
      }),
      catchError((e, c) => {
        console.error('Erro ao buscar solicitações:', e);
        return [];
      })
    );
  }

  getSolicitacao(solicitacao: SolicitacaoModel): Observable<SolicitacaoModel  | null> {
    return this.http.get<SolicitacaoModel>(`${this.BASE_URL}/${solicitacao.id}`);
  }

  getHistorico(historico: HistoricoSolicitacao): Observable<HistoricoSolicitacao[]  | null> {
    return this.http.get<HistoricoSolicitacao[]>(`${this.BASE_URL}/historico/${historico.idSolicitacao}`);
  }

  atualizarStatus(solicitacao: SolicitacaoModel, novoEstado: EstadoSolicitacao, motivo?: string): Observable<SolicitacaoModel  | null> {
    return this.http.put<SolicitacaoModel>(`${this.BASE_URL}/${solicitacao.id}/estado`, {
      estado: novoEstado,
      rejOrcamento: motivo
    });
  }

  pagarServico(solicitacao: SolicitacaoModel): Observable<SolicitacaoModel  | null> {
    return this.http.put<SolicitacaoModel>(`${this.BASE_URL}/${solicitacao.id}`, {
      pago: true
    });
  }

  enviarOrcamento(solicitacao: SolicitacaoModel, precoTotal: number, descricaoPreco: { descricao: string; preco: number }): Observable<SolicitacaoModel  | null> {
    this.atualizarStatus(solicitacao, EstadoSolicitacao.ORCADA);

    return this.http.put<SolicitacaoModel>(`${this.BASE_URL}/${solicitacao.id}/orcamento`, {
      precoTotal: precoTotal,
      descricaoPreco: descricaoPreco

    });
  }

}


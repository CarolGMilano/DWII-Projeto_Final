import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
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

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    observe: 'response' as const
  };

  constructor(private http: HttpClient) { }

  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(
      this.BASE_URL + "/categorias", 
      this.httpOptions).pipe(
        map((resp: HttpResponse<Categoria[]>) => {
          return resp.body ?? [];
      }),
      catchError((e, c) => {
        console.error('Erro ao buscar categorias:', e);
        return of([]);
      })
    );
  }

  postSolicitacao(novaSolicitacao: NovaSolicitacaoModel): Observable<NovaSolicitacaoModel  | null> {
    return this.http.post<NovaSolicitacaoModel>(
      this.BASE_URL, 
      novaSolicitacao,
      this.httpOptions).pipe(
        map((resp: HttpResponse<NovaSolicitacaoModel>) => {
          if (resp.status === 200 || resp.status === 201) {
            return resp.body;
          } else {
            return null;
          }
        }),
        catchError((err, caught) => {
          return throwError(() => err);
        })
    );
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
        return of([]);
      })
    );
  }

  getSolicitacao(solicitacao: SolicitacaoModel): Observable<SolicitacaoModel  | null> {
    return this.http.get<SolicitacaoModel>(
      this.BASE_URL + "/" + solicitacao.id,
      this.httpOptions).pipe(
        map((resp: HttpResponse<SolicitacaoModel>) => {
          if (resp.status === 200 || resp.status === 201) {
            return resp.body;
          } else {
            return null;
          }
        }),
        catchError((err, caught) => {
          if(err.status == 404) {
            return of(null);
          }
          else {
            return throwError(() => err);
          }
        })
      );
  }

  getHistorico(historico: HistoricoSolicitacao): Observable<HistoricoSolicitacao[]  | null> {
    return this.http.get<HistoricoSolicitacao[]>(
      this.BASE_URL + "/historico/" + historico.idSolicitacao,
      this.httpOptions).pipe(
        map((resp: HttpResponse<HistoricoSolicitacao[]>) => {
          if (resp.status === 200 || resp.status === 201) {
            return resp.body;
          } else {
            return null;
          }
        }),
        catchError((err, caught) => {
          if(err.status == 404) {
            return of(null);
          }
          else {
            return throwError(() => err);
          }
        })
      );
  }

  atualizarStatus(solicitacao: SolicitacaoModel, novoEstado: EstadoSolicitacao, motivo?: string): Observable<SolicitacaoModel  | null> {
    return this.http.put<SolicitacaoModel>(
      this.BASE_URL + "/" + solicitacao.id + "/estado",
      { estado: novoEstado, rejOrcamento: motivo },
      this.httpOptions).pipe(
        map((resp: HttpResponse<SolicitacaoModel>) => {
          if (resp.status === 200 || resp.status === 201) {
            return resp.body;
          } else {
            return null;
          }
        }),
        catchError((err, caught) => {
          if(err.status == 404) {
            return of(null);
          }
          else {
            return throwError(() => err);
          }
        })
      );
  }

  pagarServico(solicitacao: SolicitacaoModel): Observable<SolicitacaoModel  | null> {
    return this.http.put<SolicitacaoModel>(
      this.BASE_URL + "/" + solicitacao.id,
      { pago: true },
      this.httpOptions).pipe(
        map((resp: HttpResponse<SolicitacaoModel>) => {
          if (resp.status === 200 || resp.status === 201) {
            return resp.body;
          } else {
            return null;
          }
        }),
        catchError((err, caught) => {
          if(err.status == 404) {
            return of(null);
          }
          else {
            return throwError(() => err);
          }
        })
      );
  }

  enviarOrcamento(solicitacao: SolicitacaoModel, precoTotal: number, descricaoPreco: { descricao: string; preco: number }): Observable<SolicitacaoModel  | null> {
    this.atualizarStatus(solicitacao, EstadoSolicitacao.ORCADA);
    return this.http.put<SolicitacaoModel>(
      this.BASE_URL + "/" + solicitacao.id + "/orcamento",
      { precoTotal: precoTotal, descricaoPreco: descricaoPreco },
      this.httpOptions).pipe(
        map((resp: HttpResponse<SolicitacaoModel>) => {
          if (resp.status === 200 || resp.status === 201) {
            return resp.body;
          } else {
            return null;
          }
        }),
        catchError((err, caught) => {
          if(err.status == 404) {
            return of(null);
          }
          else {
            return throwError(() => err);
          }
        })
      )
    
  }
}


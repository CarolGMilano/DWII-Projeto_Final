import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';

import { Solicitacao, SolicitacaoResumo, SolicitacaoEntrada, StatusSolicitacao } from '../../shared';

@Injectable({
  providedIn: 'root'
})

export class SolicitacaoFakeService {
  private readonly _httpClient = inject(HttpClient)
  
  BASE_URL = "http://localhost:8080/solicitacoes";

  httpOptions = {
    observe: "response" as "response",
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  
  listar(): Observable<SolicitacaoResumo[] | null> {
    return this._httpClient.get<SolicitacaoResumo[]>(
      `${this.BASE_URL}`, 
      this.httpOptions
    ).pipe(
      map((resposta: HttpResponse<SolicitacaoResumo[]>) => {
        if(resposta.status == 200){
          return resposta.body;
        } else {
          return [];
        }
      }),
      catchError((erro) => {
        return throwError(() => erro);
      })
    );
  }

  listarPorCliente(id: number): Observable<SolicitacaoResumo[] | null> {
    return this._httpClient.get<SolicitacaoResumo[]>(
      `${this.BASE_URL}/cliente?id=${id}`, 
      this.httpOptions
    ).pipe(
      map((resposta: HttpResponse<SolicitacaoResumo[]>) => {
        if(resposta.status == 200){
          return resposta.body;
        } else {
          return [];
        }
      }),
      catchError((erro) => {
        return throwError(() => erro);
      })
    );
  }

  listarFinalizados(idUsuario: number): Observable<SolicitacaoResumo[]> {
    return this.listarPorCliente(idUsuario).pipe(
      map(lista => (lista ?? []).filter(
        solicitacao => solicitacao.status === StatusSolicitacao.FINALIZADA
      ))
    );
  }

  listarTodosPorFuncionario(id: number): Observable<SolicitacaoResumo[] | null> {
    return this._httpClient.get<SolicitacaoResumo[]>(
      `${this.BASE_URL}/funcionario?id=${id}`, 
      this.httpOptions
    ).pipe(
      map((resposta: HttpResponse<SolicitacaoResumo[]>) => {
        if(resposta.status == 200){
          return resposta.body;
        } else {
          return [];
        }
      }),
      catchError((erro) => {
        return throwError(() => erro);
      })
    );
  }

  buscarPorId(id: number): Observable<Solicitacao | null> {
    return this._httpClient.get<Solicitacao>(
      `${this.BASE_URL}/${id}`, 
      this.httpOptions
    ).pipe(
      map((resposta: HttpResponse<Solicitacao>) => {
        if(resposta.status == 200){
          return resposta.body;
        } else {
          return null;
        }
      }),
      catchError((erro) => {
        return throwError(() => erro);
      })
    );
  }
  
  inserirSolicitacao(solicitacaoEntrada: SolicitacaoEntrada): Observable<Solicitacao | null> {
    return this._httpClient.post<Solicitacao>(
      this.BASE_URL, 
      JSON.stringify(solicitacaoEntrada), 
      this.httpOptions
    ).pipe(
      map((resposta: HttpResponse<Solicitacao>) => {
        if(resposta.status == 201){
          return resposta.body;
        } else {
          return null;
        }
      }),
      catchError((erro) => {
        return throwError(() => erro);
      })
    )
  }

  orcarSolicitacao(solicitacaoEntrada: SolicitacaoEntrada): Observable<Solicitacao | null> {
    return this._httpClient.post<Solicitacao>(
      `${this.BASE_URL}/${solicitacaoEntrada.id}/orcamento`, 
      JSON.stringify(solicitacaoEntrada),
      this.httpOptions
    ).pipe(
      map((resposta: HttpResponse<Solicitacao>) => {
        if(resposta.status == 201){
          return resposta.body;
        } else {
          return null;
        }
      }),
      catchError((erro) => {
        return throwError(() => erro);
      })
    )
  } 

  aprovarSolicitacao(solicitacaoEntrada: SolicitacaoEntrada): Observable<Solicitacao | null> {
    return this._httpClient.put<Solicitacao>(
      `${this.BASE_URL}/${solicitacaoEntrada.id}/aprovar`, 
      JSON.stringify(solicitacaoEntrada),
      this.httpOptions
    ).pipe(
      map((resposta: HttpResponse<Solicitacao>) => {
        if(resposta.status == 200){
          return resposta.body;
        } else {
          return null;
        }
      }),
      catchError((erro) => {
        return throwError(() => erro);
      })
    )
  }

  rejeitarSolicitacao(solicitacaoEntrada: SolicitacaoEntrada): Observable<Solicitacao | null> {
    return this._httpClient.put<Solicitacao>(
      `${this.BASE_URL}/${solicitacaoEntrada.id}/rejeitar`, 
      JSON.stringify(solicitacaoEntrada),
      this.httpOptions
    ).pipe(
      map((resposta: HttpResponse<Solicitacao>) => {
        if(resposta.status == 200){
          return resposta.body;
        } else {
          return null;
        }
      }),
      catchError((erro) => {
        return throwError(() => erro);
      })
    )
  }

  redirecionarSolicitacao(solicitacaoEntrada: SolicitacaoEntrada): Observable<Solicitacao | null> {
    return this._httpClient.put<Solicitacao>(
      `${this.BASE_URL}/${solicitacaoEntrada.id}/redirecionar`, 
      JSON.stringify(solicitacaoEntrada),
      this.httpOptions
    ).pipe(
      map((resposta: HttpResponse<Solicitacao>) => {
        if(resposta.status == 200){
          return resposta.body;
        } else {
          return null;
        }
      }),
      catchError((erro) => {
        return throwError(() => erro);
      })
    )
  }

  arrumarSolicitacao(solicitacaoEntrada: SolicitacaoEntrada): Observable<Solicitacao | null> {
    return this._httpClient.post<Solicitacao>(
      `${this.BASE_URL}/${solicitacaoEntrada.id}/manutencao`, 
      JSON.stringify(solicitacaoEntrada),
      this.httpOptions
    ).pipe(
      map((resposta: HttpResponse<Solicitacao>) => {
        if(resposta.status == 201){
          return resposta.body;
        } else {
          return null;
        }
      }),
      catchError((erro) => {
        return throwError(() => erro);
      })
    )
  } 

  pagarSolicitacao(solicitacaoEntrada: SolicitacaoEntrada): Observable<Solicitacao | null> {
    return this._httpClient.put<Solicitacao>(
      `${this.BASE_URL}/${solicitacaoEntrada.id}/pagar`, 
      JSON.stringify(solicitacaoEntrada),
      this.httpOptions
    ).pipe(
      map((resposta: HttpResponse<Solicitacao>) => {
        if(resposta.status == 200){
          return resposta.body;
        } else {
          return null;
        }
      }),
      catchError((erro) => {
        return throwError(() => erro);
      })
    )
  }

  finalizarSolicitacao(solicitacaoEntrada: SolicitacaoEntrada): Observable<Solicitacao | null> {
    return this._httpClient.put<Solicitacao>(
      `${this.BASE_URL}/${solicitacaoEntrada.id}/finalizar`, 
      JSON.stringify(solicitacaoEntrada),
      this.httpOptions
    ).pipe(
      map((resposta: HttpResponse<Solicitacao>) => {
        if(resposta.status == 200){
          return resposta.body;
        } else {
          return null;
        }
      }),
      catchError((erro) => {
        return throwError(() => erro);
      })
    )
  }
}

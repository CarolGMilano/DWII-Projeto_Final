import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';

import { Solicitacao, SolicitacaoResumo } from '../../shared';

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

  listarFinalizadasPorCliente(id: number): Observable<SolicitacaoResumo[] | null> {
    return this._httpClient.get<SolicitacaoResumo[]>(
      `${this.BASE_URL}/cliente-finalizadas?id=${id}`, 
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

  listarAbertas(): Observable<SolicitacaoResumo[] | null> {
    return this._httpClient.get<SolicitacaoResumo[]>(
      `${this.BASE_URL}/abertas`, 
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

  listarTodosPorFuncionario(id: number): Observable<SolicitacaoResumo[] | null> {
    return this._httpClient.get<SolicitacaoResumo[]>(
      `${this.BASE_URL}/por-usuario?id=${id}`, 
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
  
  inserirSolicitacao(solicitacao: Solicitacao): Observable<Solicitacao | null> {
    return this._httpClient.post<Solicitacao>(
      this.BASE_URL, 
      JSON.stringify(solicitacao), 
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

  orcarSolicitacao(solicitacao: Solicitacao): Observable<Solicitacao | null> {
    return this._httpClient.post<Solicitacao>(
      `${this.BASE_URL}/${solicitacao.id}/orcamento`, 
      JSON.stringify(solicitacao),
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

  aprovarSolicitacao(solicitacao: Solicitacao): Observable<Solicitacao | null> {
    return this._httpClient.put<Solicitacao>(
      `${this.BASE_URL}/${solicitacao.id}/aprovar-orcamento`, 
      JSON.stringify(solicitacao),
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

  rejeitarSolicitacao(solicitacao: Solicitacao): Observable<Solicitacao | null> {
    return this._httpClient.put<Solicitacao>(
      `${this.BASE_URL}/${solicitacao.id}/rejeitar-orcamento`, 
      JSON.stringify(solicitacao),
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

  redirecionarSolicitacao(solicitacao: Solicitacao): Observable<Solicitacao | null> {
    return this._httpClient.put<Solicitacao>(
      `${this.BASE_URL}/${solicitacao.id}/redirecionar`, 
      JSON.stringify(solicitacao),
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

  arrumarSolicitacao(solicitacao: Solicitacao): Observable<Solicitacao | null> {
    return this._httpClient.post<Solicitacao>(
      `${this.BASE_URL}/${solicitacao.id}/manutencao`, 
      JSON.stringify(solicitacao),
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

  pagarSolicitacao(solicitacao: Solicitacao): Observable<Solicitacao | null> {
    return this._httpClient.put<Solicitacao>(
      `${this.BASE_URL}/${solicitacao.id}/pagar`, 
      JSON.stringify(solicitacao),
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

  finalizarSolicitacao(solicitacao: Solicitacao): Observable<Solicitacao | null> {
    return this._httpClient.put<Solicitacao>(
      `${this.BASE_URL}/${solicitacao.id}/finalizar`, 
      JSON.stringify(solicitacao),
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

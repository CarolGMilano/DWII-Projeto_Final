import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';

import { Solicitacao, SolicitacaoResumo, SolicitacaoEntrada, StatusSolicitacao } from '../../shared';

@Injectable({
  providedIn: 'root'
})

export class SolicitacaoService {
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

  listarCompletas(): Observable<Solicitacao[] | null> {
    return this._httpClient.get<Solicitacao[]>(
      `${this.BASE_URL}/completas`, 
      this.httpOptions
    ).pipe(
      map((resposta: HttpResponse<Solicitacao[]>) => {
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

  listarCompletasFinalizados(): Observable<Solicitacao[]> {
    return this.listarCompletas().pipe(
      map(lista => (lista ?? []).filter(
        solicitacao => solicitacao.status === StatusSolicitacao.FINALIZADA
      ))
    );
  }

  listarTodasFiltradasResumo(idFuncionario: number): Observable<SolicitacaoResumo[]> {
    return this.listarCompletas().pipe(
      map(lista => (lista ?? [])
        .filter(solicitacao => {
          if (solicitacao.status === StatusSolicitacao.ABERTA) return false;

          if (solicitacao.status === StatusSolicitacao.REDIRECIONADA) {
            return solicitacao.funcionario.id === idFuncionario;
          }
          return true; 
        })
        //Tranforma em SolicitacaoResumo
        .map(solicitacao => {
          const historicoAbertura = solicitacao.historico.find(h => h.status === StatusSolicitacao.ABERTA);

          return {
            id: solicitacao.id,
            descricao: solicitacao.descricao,
            equipamento: solicitacao.equipamento,
            status: solicitacao.status,
            dataAbertura: historicoAbertura ? historicoAbertura.dataHora : null,
            funcionario: solicitacao.funcionario,
            cliente: solicitacao.cliente
          } as SolicitacaoResumo;
        })
      )
    );
  }

  formatarData(data: Date): string {
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const dia = String(data.getDate()).padStart(2, '0');
    
    return `${ano}-${mes}-${dia}`;
  }

  filtrarPorDia(dataInicial: string | null, dataFinal: string | null) {
    const inicio = dataInicial ;
    const fim = dataFinal ;
    
    return this.listarCompletasFinalizados().pipe(
      map(lista => (lista ?? []).filter( solicitacao => {
        const historicoAbertura = solicitacao.historico?.find(historico => historico.status === StatusSolicitacao.FINALIZADA);
        
        if (!historicoAbertura) return false;
        
        const dataAbertura = this.formatarData(new Date(historicoAbertura.dataHora));
          
          if (!inicio && !fim) return true;
          if (!inicio && fim) return dataAbertura <= fim;
          if (inicio && !fim) return dataAbertura >= inicio;

          return dataAbertura >= inicio! && dataAbertura <= fim!;
        }
      ))
    );
  }

  listarAbertas(): Observable<SolicitacaoResumo[]> {
    return this.listar().pipe(
      map(lista => (lista ?? []).filter(
        solicitacao => solicitacao.status === StatusSolicitacao.ABERTA
      ))
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

  listarEmAndamento(idUsuario: number): Observable<SolicitacaoResumo[]> {
    return this.listarPorCliente(idUsuario).pipe(
      map(lista => (lista ?? []).filter(
        solicitacao => solicitacao.status !== StatusSolicitacao.FINALIZADA
      ))
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

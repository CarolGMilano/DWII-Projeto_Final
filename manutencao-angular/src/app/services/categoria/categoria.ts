import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';

import { Categoria } from '../../shared';

@Injectable({
  providedIn: 'root'
})

export class CategoriaService {
  private apiUrl = ''; 
  
  constructor(private http: HttpClient) {}

  private readonly _httpClient = inject(HttpClient)
  
  BASE_URL = "http://localhost:8080/categorias";

  httpOptions = {
    observe: "response" as "response",
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  
  listar(): Observable<Categoria[] | null> {
    return this._httpClient.get<Categoria[]>(
      `${this.BASE_URL}`, 
      this.httpOptions
    ).pipe(
      map((resposta: HttpResponse<Categoria[]>) => {
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

  buscarPorId(id: number): Observable<Categoria | null> {
    return this._httpClient.get<Categoria>(
      `${this.BASE_URL}/${id}`, 
      this.httpOptions
    ).pipe(
      map((resposta: HttpResponse<Categoria>) => {
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
  
  /*
  get categorias(): Observable<Categoria[]> {
    const mockCategorias: Categoria[] = [
      { id: 1, nome: 'Celular' },
      { id: 2, nome: 'Computador' },
      { id: 3, nome: 'Impressora' },
      { id: 4, nome: 'Televisão' }
    ];
    return of(mockCategorias); // transforma em Observable
  }
  
  get categorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apiUrl + '/categorias');
  }
  */
  
  postCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(this.apiUrl + '/categorias', categoria);
  }

  putCategoria(id: number, categoria: string): Observable<Categoria> {
    return this.http.put<Categoria>(`${this.apiUrl}/categorias/${id}`, categoria);
  }

  deleteCategoria(id: number) {
    return this.http.delete(`${this.apiUrl}/categorias/${id}`);
  }
}

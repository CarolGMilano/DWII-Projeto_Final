import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Categoria } from '../../models/Categoria';

@Injectable({
  providedIn: 'root'
})

export class CategoriaService {
  private apiUrl = "http://localhost:8080/categorias"; 
  
  constructor(private http: HttpClient) {}

  // get categorias(): Observable<Categoria[]> {
  //   const mockCategorias: Categoria[] = [
  //     { id: 1, nome: 'Celular' },
  //     { id: 2, nome: 'Computador' },
  //     { id: 3, nome: 'Impressora' },
  //     { id: 4, nome: 'Televisão' }
  //   ];
  //   return of(mockCategorias); // transforma em Observable
  // }
  
  get categorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apiUrl);
  }
  
  postCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(this.apiUrl, categoria);
  }

  putCategoria(id: number, categoria: string): Observable<Categoria> {
    return this.http.put<Categoria>(`${this.apiUrl}/categorias/${id}`, categoria);
  }

  deleteCategoria(id: number) {
    return this.http.delete(`${this.apiUrl}/categorias/${id}`);
  }
}

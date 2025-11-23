import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../../shared';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private BASE_URL = "http://localhost:8080/categorias";

  constructor(private http: HttpClient) {}

  listar(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.BASE_URL);
  }

  buscarPorId(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.BASE_URL}/${id}`);
  }

  criar(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(this.BASE_URL, categoria);
  }

  atualizar(id: number, categoria: Categoria): Observable<Categoria> {
    return this.http.put<Categoria>(`${this.BASE_URL}/${id}`, categoria);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}/${id}`);
  }
}

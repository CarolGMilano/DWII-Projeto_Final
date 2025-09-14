import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../../models/Categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private apiUrl = '';

  constructor(private http : HttpClient) {}

  get categorias():Observable<Categoria[]>{
    return this.http.get<Categoria[]>(this.apiUrl + '/categorias');
  }
  postCategoria(categoria: Categoria): Observable<Categoria>{
    return this.http.post<Categoria>(this.apiUrl + '/categorias', categoria)
  } 

  putCategoria(id: number, categoria: string): Observable<Categoria>{
    return this.http.put<Categoria>(`${this.apiUrl}/categorias/${id}`, categoria)
  }
  
  deleteCategoria(id: number){
    return this.http.delete(`${this.apiUrl}/categorias/${id}`);
  }
  

}

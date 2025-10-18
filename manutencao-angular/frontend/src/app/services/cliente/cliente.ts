import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Cliente } from '../../shared';

@Injectable({
  providedIn: 'root'
})

export class ClienteService {
  private readonly _httpClient = inject(HttpClient)
  
  BASE_URL = "http://localhost:3000/cliente";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  listarTodos(): Observable<Cliente[]> {
    return this._httpClient.get<Cliente[]>(this.BASE_URL, this.httpOptions);
  }

  inserir(cliente: Cliente): Observable<Cliente> {
    return this._httpClient.post<Cliente>(this.BASE_URL, JSON.stringify(cliente), this.httpOptions);
  }

  buscarPorId(id: number): Observable<Cliente | undefined> {
    return this._httpClient.get<Cliente>(this.BASE_URL + "/" + id, this.httpOptions);   
  }
}

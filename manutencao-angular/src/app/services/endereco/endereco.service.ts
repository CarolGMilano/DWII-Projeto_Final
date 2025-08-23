import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface IEnderecoAPI {
  cep: string,
  logradouro: string,
  complemento: string,
  unidade: string,
  bairro: string,
  localidade: string,
  uf: string,
  estado: string,
  regiao: string,
  ibge: string,
  gia: string,
  ddd: string,
  siafi: string
}

@Injectable({
  providedIn: 'root'
})

export class EnderecoService {
  private readonly _httpClient = inject(HttpClient)

  getEndereco(cep: string): Observable<IEnderecoAPI>{
    return this._httpClient.get<IEnderecoAPI>(`https://viacep.com.br/ws/${cep}/json`);
  }
}

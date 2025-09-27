import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Relatorio {
  private apiUrl = '';

  constructor(private http : HttpClient) {}

}

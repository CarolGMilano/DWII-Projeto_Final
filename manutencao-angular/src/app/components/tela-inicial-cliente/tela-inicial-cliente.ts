import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FilterPipe } from '../../pipes/filter-pipe';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MOCK_DATA_SOLICITACOES } from '../../models/mock-data-solicitacoes';

@Component({
  selector: 'app-tela-inicial-cliente',
  imports: [CommonModule, FilterPipe, FormsModule, RouterModule],
  templateUrl: './tela-inicial-cliente.html',
  styleUrl: './tela-inicial-cliente.css'
})
export class TelaInicialCliente implements OnInit {
  solicitacoes = MOCK_DATA_SOLICITACOES;
  searchText: string = '';
  dateField?: string = '';
  selectedDate?: Date;
  filtroOrdenacao: string = 'recentes';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
      this.http.get<any[]>('models/mock-data-solicitacoes.json').subscribe(data => {
        this.solicitacoes = data;
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FilterPipe } from '../../pipes/filter-pipe';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MOCK_DATA_SOLICITACOES } from '../../models/mock-data-solicitacoes';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-tela-lista-solicitacoes',
  imports: [CommonModule, FilterPipe, FormsModule, RouterModule, MatIconModule],
  templateUrl: './tela-lista-solicitacoes.html',
  styleUrl: './tela-lista-solicitacoes.css'
})
export class TelaListaSolicitacoes implements OnInit {
  solicitacoes = MOCK_DATA_SOLICITACOES;
  searchText: string = '';
  dateField?: string = '';
  selectedDate?: Date;
  filtroOrdenacao: 'desc' | 'asc' = 'asc';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
      this.http.get<any[]>('models/mock-data-solicitacoes.json').subscribe(data => {
        this.solicitacoes = data;
      });
  }
}

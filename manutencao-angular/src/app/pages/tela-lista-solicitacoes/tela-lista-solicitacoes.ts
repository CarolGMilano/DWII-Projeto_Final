import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FilterPipe } from '../../pipes/filter-pipe';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MOCK_DATA_SOLICITACOES } from '../../models/mock-data-solicitacoes';
import { MatIconModule } from '@angular/material/icon';
import { SolicitacaoService } from '../../services';

@Component({
  selector: 'app-tela-lista-solicitacoes',
  imports: [CommonModule, FilterPipe, FormsModule, RouterModule, MatIconModule],
  templateUrl: './tela-lista-solicitacoes.html',
  styleUrl: './tela-lista-solicitacoes.css'
})
export class TelaListaSolicitacoes implements OnInit {
  // solicitacoes = MOCK_DATA_SOLICITACOES;
  solicitacoes: any[] = [];
  searchText: string = '';
  dateField?: string = '';
  selectedDate?: Date | string;
  filtroOrdenacao: 'desc' | 'asc' = 'asc';
  startDate?: Date;
  endDate?: Date;

  // constructor(private http: HttpClient) { }

  // ngOnInit(): void {
  //   this.http.get<any[]>('models/mock-data-solicitacoes.json').subscribe(data => {
  //     this.solicitacoes = data;
  //   });
  // }

  constructor(private solicitacaoService: SolicitacaoService) { }

  ngOnInit(): void {
    this.carregarSolicitacoes();
  }

  carregarSolicitacoes() {
    this.solicitacaoService.getSolicitacoes().subscribe({
      next: (data) => {
        this.solicitacoes = data;
      },
      error: (err) => {
        console.error('Erro ao carregar solicitações', err);
      }
    });
  }

  filtrarHoje() {
    const hoje = new Date();
    const yyyy = hoje.getFullYear();
    const mm = String(hoje.getMonth() + 1).padStart(2, '0');
    const dd = String(hoje.getDate()).padStart(2, '0');

    this.selectedDate = `${yyyy}-${mm}-${dd}`;
    this.startDate = undefined;
    this.endDate = undefined;
  }

  limparFiltroData() {
    this.selectedDate = undefined;
    this.startDate = undefined;
    this.endDate = undefined;
  }
}

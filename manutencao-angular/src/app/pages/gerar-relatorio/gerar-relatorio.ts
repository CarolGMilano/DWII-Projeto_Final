import jsPDF from 'jspdf';

import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ClienteResumo, Funcionario, Solicitacao, SolicitacaoResumo, StatusSolicitacao } from '../../shared';
import { ClienteService, FuncionarioService, SolicitacaoService } from '../../services';
import { ElementoLoading, ElementoLoadingCard } from '../../components';

@Component({
  selector: 'app-gerar-relatorio',
  standalone: true,
  imports: [CommonModule, FormsModule, ElementoLoadingCard, ElementoLoading],
  templateUrl: './gerar-relatorio.html',
  styleUrls: ['./gerar-relatorio.css']
})
export class GerarRelatorio implements OnInit {
  private solicitacaoService = inject(SolicitacaoService);
  private clienteService = inject(ClienteService);
  private funcionarioService = inject(FuncionarioService);

  solicitacoes!: Solicitacao[];

  qtClientes: number = 0;
  qtFuncionarios: number = 0;
  qtSolicitacoes: number = 0;
  qtSolicitacoesFinalizadas: number = 0;
  porcentagemFinalizadas: number = 0;

  loadingClientes: boolean = false;
  loadingFuncionarios: boolean = false;
  loadingReceita: boolean = false;
  loadingPorcentagem: boolean = false;
  loading: boolean = false;

  //É um objeto que agrupa arrays de objetos ou coisas.
  solicitacoesAgrupadas: Record<string, { lista: Solicitacao[]; total: number }> = {};
  
  mostrarReceita = false;
  mostrarCategoria = false;

  dataInicial: string = '';
  dataFinal: string = '';

  receitaTotal: number = 0;

  receitaPorCategoria: { categoria: string, valor: number }[] = [];

  ngOnInit(): void {
    this.listarClientes();
    this.listarFuncionarios();
    this.listarSolicitacoes();
  }

  //Como o valor pode mudar, um getter é melhor para printar.
  get percentualFinalizadas(): number {
    return this.qtSolicitacoes === 0 
      ? 0 
      : (this.qtSolicitacoesFinalizadas * 100) / this.qtSolicitacoes;
  }

  listarFuncionarios() {
    this.loadingFuncionarios = true;

    this.funcionarioService.listarTodos().subscribe({
      next: (funcionarios: Funcionario[] | null) => {
        if(funcionarios == null){
          this.qtFuncionarios = 0;
        } else {
          this.qtFuncionarios = funcionarios.length;
        }

        this.loadingFuncionarios = false;
      },
      error: (erro) => {
        if (erro.status === 500) {
          this.loadingFuncionarios = false;
          alert(`Erro interno: ${erro.error}`);
        } else {
          this.loadingFuncionarios = false;
          alert('Erro inesperado ao listar funcionários.');
        }
      }
    });
  }

  listarSolicitacoesFinalizadas() {   
    this.solicitacaoService.listarCompletasFinalizados().subscribe({
      next: (solicitacoes: Solicitacao[] | null) => {
        if(solicitacoes == null){
          this.qtSolicitacoesFinalizadas = 0;
        } else {
          this.solicitacoes = solicitacoes;

          for (const solicitacao of this.solicitacoes) {
            this.receitaTotal += solicitacao.orcamento?.valorTotal ?? 0;
          }

          this.qtSolicitacoesFinalizadas = solicitacoes.length;
        }

        this.loadingPorcentagem = false;
        this.loadingReceita = false;
      },
      error: (erro) => {
        if (erro.status === 500) {
          this.loadingPorcentagem = false;
          this.loadingReceita = false;
          alert(`Erro interno: ${erro.error}`);
        } else {
          this.loadingPorcentagem = false;
          this.loadingReceita = false;
          alert('Erro inesperado ao listar solicitações finalizadas.');
        }
      }
    });
  }

  listarSolicitacoes() {
    this.loadingPorcentagem = true;
    this.loadingReceita = true;

    this.solicitacaoService.listar().subscribe({
      next: (solicitacoes: SolicitacaoResumo[] | null) => {
        if(solicitacoes == null){
          this.qtSolicitacoes = 0;
        } else {
          this.qtSolicitacoes = solicitacoes.length;
        }

        this.listarSolicitacoesFinalizadas()
      },
      error: (erro) => {
        if (erro.status === 500) {
          alert(`Erro interno: ${erro.error}`);
        } else {
          alert('Erro inesperado ao listar solicitações.');
        }
      }
    });
  }

  listarClientes() {
    this.loadingClientes = true;
    this.loadingFuncionarios = true;
    this.loadingPorcentagem = true;
    this.loadingReceita = true;

    this.clienteService.listarTodos().subscribe({
      next: (clientes: ClienteResumo[] | null) => {
        if(clientes == null){
          this.qtClientes = 0;
        } else {
          this.qtClientes = clientes.length;
        }

        this.loadingClientes = false;
      },
      error: (erro) => {
        if (erro.status === 500) {
          this.loadingClientes = false;
          alert(`Erro interno: ${erro.error}`);
        } else {
          this.loadingClientes = false;
          alert('Erro inesperado ao listar clientes.');
        }
      }
    });
  }

  carregarSolicitacoesPorDia(inicio: string | null, fim: string | null): Solicitacao[] {
    this.solicitacaoService.filtrarPorDia(inicio, fim).subscribe({
      next: (solicitacoes: Solicitacao[] | null) => {
        this.solicitacoes = solicitacoes ?? [];

        this.solicitacoesAgrupadas = this.agruparPorDia(this.solicitacoes);

        this.receitaTotal = 0;

        for (const solicitacao of this.solicitacoes) {
          this.receitaTotal += solicitacao.orcamento?.valorTotal ?? 0;
        }

        this.loading = false;
      },
      error: (erro) => {
        if (erro.status === 500) {
          this.loading = false;
          alert(`Erro interno: ${erro.error}`);
        } else {
          this.loading = false;
          alert('Erro inesperado agrupar solicitações por dia.');
        }
      }
    });

    return this.solicitacoes;
  }

  carregarSolicitacoesPorCategoria(): Solicitacao[] {
    this.solicitacaoService.listarCompletasFinalizados().subscribe({
      next: (solicitacoes: Solicitacao[] | null) => {
        this.solicitacoes = solicitacoes ?? [];

        this.solicitacoesAgrupadas = this.agruparPorCategoria(this.solicitacoes);

        this.receitaTotal = 0;

        for (const solicitacao of this.solicitacoes) {
          this.receitaTotal += solicitacao.orcamento?.valorTotal ?? 0;
        }
        this.loading = false;
      },
      error: (erro) => {
        if (erro.status === 500) {
          this.loading = false;
          alert(`Erro interno: ${erro.error}`);
        } else {
          this.loading = false;
          alert('Erro inesperado ao agrupar solicitações por categoria.');
        }
      }
    });

    return this.solicitacoes;
  }

  agruparPorDia(lista: Solicitacao[]) {
    return lista.reduce((acumulador, solicitacao) => {
      const historicoAbertura = solicitacao.historico?.find(historico => historico.status === StatusSolicitacao.FINALIZADA);

      if (!historicoAbertura) return acumulador;

      const dia = new Date(historicoAbertura?.dataHora).toISOString().split("T")[0];

      if (!acumulador[dia]) {
        acumulador[dia] = {
          lista: [],
          total: 0
        };
      }

      acumulador[dia].lista.push(solicitacao);
      acumulador[dia].total += solicitacao.orcamento?.valorTotal ?? 0;

      return acumulador;
    }, {} as Record<string, { lista: Solicitacao[]; total: number }>);
  }

  agruparPorCategoria(lista: Solicitacao[]) {
    return lista.reduce((acumulador, solicitacao) => {
      const categoria = solicitacao.categoria;
      
      if (!acumulador[categoria]) {
        acumulador[categoria] = {
          lista: [],
          total: 0
        };
      }
      

      acumulador[categoria].lista.push(solicitacao);
      acumulador[categoria].total += solicitacao.orcamento?.valorTotal ?? 0;

      return acumulador;
    }, {} as Record<string, { lista: Solicitacao[]; total: number }>);
  }

  gerarReceita() {
    this.loading = true;
    this.carregarSolicitacoesPorDia(this.dataInicial, this.dataFinal);
  }

  gerarPorCategoria() {
    this.loading = true;
    this.carregarSolicitacoesPorCategoria();
  }

  downloadReceitaPDF() {
    const doc = new jsPDF();
                                          //posição horizontal e vertical no PDF
    doc.text('Relatório de Receita por Dia', 10, 10);

    let vertical = 20;

    Object.keys(this.solicitacoesAgrupadas).forEach(dia => {
      const itens = this.solicitacoesAgrupadas[dia];

      doc.text(`${dia}`, 10, vertical);
      vertical += 8;

      itens.lista.forEach(item => {
        const valor = item.orcamento?.valorTotal ?? 0;
        doc.text(`ID ${item.id}: R$ ${valor}`, 12, vertical);
        vertical += 6;
      });

      vertical += 4;
    });

    doc.text(`Total: R$ ${this.receitaTotal}`, 10, vertical + 10);
    doc.save('relatorio-receita.pdf');
  }

  downloadCategoriaPDF() {
    const doc = new jsPDF();
    doc.text('Relatório de Receita por Categoria', 10, 10);

    let vertical = 20;

    Object.keys(this.solicitacoesAgrupadas).forEach(dia => {
      const itens = this.solicitacoesAgrupadas[dia];

      doc.text(`${dia}`, 10, vertical);
      vertical += 8;

      itens.lista.forEach(item => {
        const valor = item.orcamento?.valorTotal ?? 0;
        doc.text(`ID ${item.id}: R$ ${valor}`, 12, vertical);
        vertical += 6;
      });

      vertical += 4;
    });

    doc.text(`Total: R$ ${this.receitaTotal}`, 10, vertical + 10);

    doc.save('relatorio-categoria.pdf');
  }
}
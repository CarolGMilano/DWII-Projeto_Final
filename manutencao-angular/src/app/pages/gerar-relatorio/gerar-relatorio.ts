
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';


@Component({
  selector: 'app-gerar-relatorio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gerar-relatorio.html',
  styleUrls: ['./gerar-relatorio.css']
})
export class GerarRelatorio {
  mostrarReceita = false;
  mostrarCategoria = false;

  dataInicial: string = '';
  dataFinal: string = '';

  receitaPorDia: { data: string, valor: number }[] = [];
  receitaTotal: number = 0;

  receitaPorCategoria: { categoria: string, valor: number }[] = [];

  // Mock de dados de receitas por dia, pegar do banco de dados depois 
  private receitasMock = [
    { data: '2025-09-01', valor: 500 },
    { data: '2025-09-02', valor: 1200 },
    { data: '2025-09-03', valor: 800 },
    { data: '2025-09-04', valor: 900 },
    { data: '2025-09-05', valor: 700 }
  ];

  // Mock de receitas por categoria, pegar do banco de dados depois
  private categoriasMock = [
    { categoria: 'Informática', valor: 8000 },
    { categoria: 'Eletrodomésticos', valor: 7000 },
    { categoria: 'Telefonia', valor: 3000 }
  ];

  gerarReceita() {
    // Filtro por data
    let receitasFiltradas = this.receitasMock;
    if (this.dataInicial) {
      receitasFiltradas = receitasFiltradas.filter(r => r.data >= this.dataInicial);
    }
    if (this.dataFinal) {
      receitasFiltradas = receitasFiltradas.filter(r => r.data <= this.dataFinal);
    }
    this.receitaPorDia = receitasFiltradas;
    this.receitaTotal = receitasFiltradas.reduce((acc, r) => acc + r.valor, 0);
  }

  gerarPorCategoria() {
    this.receitaPorCategoria = this.categoriasMock;
  }

  downloadReceitaPDF() {
    const doc = new jsPDF();
    doc.text('Relatório de Receita por Dia', 10, 10);
    let y = 20;
    this.receitaPorDia.forEach(item => {
      doc.text(`${item.data}: R$ ${item.valor}`, 10, y);
      y += 10;
    });
    doc.text(`Total: R$ ${this.receitaTotal}`, 10, y + 10);
    doc.save('relatorio-receita.pdf');
  }

  downloadCategoriaPDF() {
    const doc = new jsPDF();
    doc.text('Relatório de Receita por Categoria', 10, 10);
    let y = 20;
    this.receitaPorCategoria.forEach(item => {
      doc.text(`${item.categoria}: R$ ${item.valor}`, 10, y);
      y += 10;
    });
    doc.save('relatorio-categoria.pdf');
  }
}
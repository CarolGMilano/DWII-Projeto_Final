import { Injectable } from '@angular/core';

import { SolicitacaoDetalhe } from '../../shared';

const LS_SOLICITACOES = 'solicitacoes';

@Injectable({
  providedIn: 'root'
})

export class SolicitacaoFakeService {
  private id = 0;
  
  listarTodos(): SolicitacaoDetalhe[] {
    const solicitacoes = localStorage[LS_SOLICITACOES];

    return solicitacoes ? JSON.parse(solicitacoes) : [];
  }

  inserir(solicitacao: SolicitacaoDetalhe): void {
    const solicitacoes = this.listarTodos();

    if (solicitacoes.length > 0) {
      this.id = Math.max(...solicitacoes.map(solicitacao => solicitacao.idSolicitacao || 0)) + 1;
    }
    
    solicitacao.idSolicitacao = this.id++;
    
    solicitacoes.push(solicitacao);

    localStorage[LS_SOLICITACOES] = JSON.stringify(solicitacoes);
  }

  buscarPorId(id: number): SolicitacaoDetalhe {
    const solicitacoes = this.listarTodos();

    return solicitacoes.find(solicitacao => solicitacao.idSolicitacao === id)!;
  }

  atualizar(solicitacao: SolicitacaoDetalhe): void{
    const solicitacoes = this.listarTodos();

    solicitacoes.forEach((obj, index, lista) => {
      if(solicitacao.idSolicitacao === obj.idSolicitacao) {
        lista[index] = solicitacao;
      }
    });

    localStorage[LS_SOLICITACOES] = JSON.stringify(solicitacoes);
  }

  remover(id: number): void {
  }
}

import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { 
  SharedModule,
  Solicitacao, 
  StatusSolicitacao, 
  StatusSolicitacaoLabel, 
  StatusSolicitacaoCor, 
  Manutencao, 
  Historico,
  StatusSolicitacaoObservacao,
  Funcionario, 
} from "../../shared";

import { ClienteService, FuncionarioService, SolicitacaoFakeService } from '../../services';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-tela-visualizar-detalhes',
  imports: [CommonModule, FormsModule, RouterLink, SharedModule],
  templateUrl: './tela-visualizar-detalhes.html',
  styleUrl: './tela-visualizar-detalhes.css'
})
export class TelaVisualizarDetalhes implements OnInit {
  @ViewChild('formManutencao') formManutencao! : NgForm;

  private solicitacaoFakeService = inject(SolicitacaoFakeService);
  private clienteService = inject(ClienteService);
  private funcionarioService = inject(FuncionarioService);

  StatusSolicitacaoLabel = StatusSolicitacaoLabel;
  StatusSolicitacaoCor = StatusSolicitacaoCor;
  StatusSolicitacaoObservacao = StatusSolicitacaoObservacao;
  StatusSolicitacao = StatusSolicitacao;

  funcionarioLogado = JSON.parse(localStorage.getItem('usuarioLogado')!);
  
  manutencao: Manutencao = {
    idSolicitacao: undefined,
    descricao: '',
    orientacoes: '',
  };

  funcionarios: Funcionario[] = [];
  funcionarioDestinoSelecionado!: number;

  mostrarFormulario: boolean = false;
  mostrarRedirecionamento: boolean = false;

  solicitacoes: Solicitacao[] = [];

  private route = inject(ActivatedRoute);

  id!: number;
  solicitacao!: Solicitacao;

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.funcionarioService.listarTodos().subscribe({
      next: (dados) => this.funcionarios = dados,
      error: (err) => console.error(err)
    });

    this.solicitacaoFakeService.buscarPorId(this.id).subscribe({
      next: (solicitacao) => this.solicitacao = solicitacao
    });
  }

  get podeFazerManutencao(): boolean {
    const statusValido = 
      this.solicitacao.status === StatusSolicitacao.APROVADA ||
      this.solicitacao.status === StatusSolicitacao.REDIRECIONADA;

    const usuarioResponsavel = 
      this.solicitacao.funcionario?.id === this.funcionarioLogado.idFuncionario;

    const orcamentoAceito = this.solicitacao.orcamento?.aprovada ?? false;

    const manutencaoNaoFeita = !this.solicitacao.historico.some(
      h => h.status === StatusSolicitacao.ARRUMADA
    );

    return statusValido && usuarioResponsavel && orcamentoAceito && manutencaoNaoFeita;
  }

  get podeRedirecionar(): boolean {
    const statusValido = 
      this.solicitacao.status == StatusSolicitacao.APROVADA || 
      this.solicitacao.status == StatusSolicitacao.REDIRECIONADA ||
      this.solicitacao.status == StatusSolicitacao.ARRUMADA ||
      this.solicitacao.status == StatusSolicitacao.PAGA 

    const usuarioResponsavel = 
      this.solicitacao.funcionario?.id === this.funcionarioLogado.idFuncionario;

    const orcamentoAceito = this.solicitacao.orcamento?.aprovada ?? false;

    return statusValido && usuarioResponsavel && orcamentoAceito;
  }

  get podeFinalizar(): boolean {
    const statusValido =  
      this.solicitacao.status == StatusSolicitacao.REDIRECIONADA ||
      this.solicitacao.status == StatusSolicitacao.PAGA 

    const usuarioResponsavel = 
      this.solicitacao.funcionario?.id === this.funcionarioLogado.idFuncionario;

    const manutencaoPaga = this.solicitacao.historico.some(
      h => h.status === StatusSolicitacao.PAGA
    );

    return statusValido && usuarioResponsavel && manutencaoPaga;
  }

  getStatusCor(status: number): string {
    return StatusSolicitacaoCor[status as StatusSolicitacao];
  }

  getStatusLabel(status: number): string {
    return StatusSolicitacaoLabel[status as StatusSolicitacao];
  }

  getStatusObservacao(status: number): string {
    return StatusSolicitacaoObservacao[status as StatusSolicitacao];
  }

  mostrarFormularioManutencao (){
    this.mostrarFormulario = true;
  }

  mostrarModalRedirecionamento (){
    this.mostrarRedirecionamento = true;
    this.funcionarioDestinoSelecionado = -1;
  }

  cancelarRedirecionamento(){
    this.mostrarRedirecionamento = false; 
    this.funcionarioDestinoSelecionado = -1;
  }

  cancelarManutencao(){
    this.mostrarFormulario = false;
    this.formManutencao.reset();
  }

  salvarRedirecionamento(){
    if (Number(this.funcionarioDestinoSelecionado) === -1) return;

    forkJoin({
      solicitacao: this.solicitacaoFakeService.buscarPorId(this.id),
      funcionarioDestino: this.funcionarioService.buscarPorId(Number(this.funcionarioDestinoSelecionado))
    }).subscribe({
      next: ({ solicitacao, funcionarioDestino }) => {
        if (!funcionarioDestino) return;

        const historico: Historico = {
          dataHora: new Date(),
          status: StatusSolicitacao.REDIRECIONADA,
          funcionario: this.funcionarioLogado,
          funcionarioDestino: funcionarioDestino
        };

        // Atualiza a solicitação
        solicitacao.historico.push(historico);
        solicitacao.status = historico.status;
        solicitacao.funcionario = funcionarioDestino;

        this.solicitacaoFakeService.atualizar(solicitacao).subscribe({
          next: () => {
            // Atualiza o objeto local
            this.solicitacao = solicitacao;
            this.cancelarRedirecionamento();
          },
          error: err => console.error('Erro ao atualizar solicitacao', err)
        });
      },
      error: err => console.error('Erro ao buscar dados', err)
    });
  }

  salvarManutencao(){
    if (!this.formManutencao.form.valid) return;

    this.solicitacaoFakeService.buscarPorId(this.id).subscribe({
      next: (solicitacao) => {
        const manutencao: Manutencao = {
          idSolicitacao: this.id,
          descricao: this.manutencao.descricao,
          orientacoes: this.manutencao.orientacoes
        };
        const historico: Historico = {
          dataHora: new Date(),
          status: StatusSolicitacao.ARRUMADA,
          funcionario: this.funcionarioLogado
        };

        solicitacao.historico.push(historico);
        solicitacao.manutencao = manutencao;
        solicitacao.status = historico.status;

        this.solicitacaoFakeService.atualizar(solicitacao).subscribe({
          next: () => {
            this.solicitacao = solicitacao;
            this.cancelarManutencao();
          },
          error: (err) => console.error('Erro ao atualizar a solicitação', err)
        });
      },
      error: (err) => console.error('Erro ao buscar a solicitação', err)
    });
  }

  finalizarSolicitacao() {
    this.solicitacaoFakeService.buscarPorId(this.id).subscribe({
      next: (solicitacao) => {
        const historico: Historico = {
          dataHora: new Date(),
          status: StatusSolicitacao.FINALIZADA,
          funcionario: this.funcionarioLogado
        };

        solicitacao.historico.push(historico);
        solicitacao.status = historico.status;

        this.solicitacaoFakeService.atualizar(solicitacao).subscribe({
          next: () => {
            this.solicitacao = solicitacao;
          },
          error: (err) => console.error('Erro ao atualizar solicitação', err)
        });
      },
      error: (err) => console.error('Erro ao buscar solicitação', err)
    });
  }

  listarTodos(): void {
    this.solicitacaoFakeService.listarTodos().subscribe({
      next: (solicitacoes) => {
        this.solicitacoes = solicitacoes;
      },
      error: (err) => console.error('Erro ao listar solicitações', err)
    });
  }
}

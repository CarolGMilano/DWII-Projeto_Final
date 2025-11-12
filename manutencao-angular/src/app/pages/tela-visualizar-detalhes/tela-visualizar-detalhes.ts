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
  UsuarioLogado,
  FuncionarioResumo,
} from "../../shared";

import { ClienteService, FuncionarioService, LoginService, SolicitacaoFakeService } from '../../services';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-tela-visualizar-detalhes',
  imports: [CommonModule, FormsModule, RouterLink, SharedModule],
  templateUrl: './tela-visualizar-detalhes.html',
  styleUrl: './tela-visualizar-detalhes.css'
})
export class TelaVisualizarDetalhes implements OnInit {
  @ViewChild('formManutencao') formManutencao! : NgForm;

  private solicitacaoService = inject(SolicitacaoFakeService);
  private clienteService = inject(ClienteService);
  private funcionarioService = inject(FuncionarioService);
  private loginService = inject(LoginService);

  StatusSolicitacaoLabel = StatusSolicitacaoLabel;
  StatusSolicitacaoCor = StatusSolicitacaoCor;
  StatusSolicitacaoObservacao = StatusSolicitacaoObservacao;
  StatusSolicitacao = StatusSolicitacao;

  usuarioLogado: UsuarioLogado | null = this.loginService.usuarioLogado;
  funcionarioLogado!: FuncionarioResumo;

  manutencao: Manutencao = {
    descricao: '',
    orientacao: '',
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
      next: (funcionarios: Funcionario[] | null) => {
        if(funcionarios == null){
          this.funcionarios = [];
        } else {
          this.funcionarios = funcionarios;
        }
      },
      error: (erro) => {
        if (erro.status === 500) {
          alert(`Erro interno: ${erro.error}`);
        } else {
          alert('Erro inesperado ao listar funcionários.');
        }
      }
    });

    this.solicitacaoService.buscarPorId(this.id).subscribe({
      next: (solicitacao) => {
        if (solicitacao) {
          this.solicitacao = solicitacao;
          console.log("solicitacao ", this.solicitacao);
        }
      }
    });

    if (this.usuarioLogado && this.usuarioLogado.id != null) {
      this.funcionarioService.buscarPorUsuario(this.usuarioLogado.id).subscribe({
        next: (funcionario) => {
          if (funcionario) {
            this.funcionarioLogado = funcionario
          }
        }
      });
    }
  }

  get podeFazerManutencao(): boolean {
    const statusValido = 
      this.solicitacao.status === StatusSolicitacao.APROVADA ||
      this.solicitacao.status === StatusSolicitacao.REDIRECIONADA;

    const usuarioResponsavel = 
      this.solicitacao.funcionario?.id === this.funcionarioLogado?.id;

    //Como o orçamento pode ser null, tratamos aqui para retornar tudo que não for true como false. 
    const orcamentoAceito = this.solicitacao.orcamento?.aprovada ?? false;

    const manutencaoNaoFeita = !this.solicitacao.historico.some(
      h => h.status === StatusSolicitacao.ARRUMADA
    );

    console.log(this.solicitacao.funcionario?.id, this.funcionarioLogado?.id)

    return statusValido && usuarioResponsavel && orcamentoAceito && manutencaoNaoFeita;
  }

  get podeRedirecionar(): boolean {
    const statusValido = 
      this.solicitacao.status == StatusSolicitacao.APROVADA || 
      this.solicitacao.status == StatusSolicitacao.REDIRECIONADA ||
      this.solicitacao.status == StatusSolicitacao.ARRUMADA ||
      this.solicitacao.status == StatusSolicitacao.PAGA 

    const usuarioResponsavel = 
      this.solicitacao.funcionario?.id === this.funcionarioLogado?.id;

    const orcamentoAceito = this.solicitacao.orcamento?.aprovada ?? false;

    return statusValido && usuarioResponsavel && orcamentoAceito;
  }

  get podeFinalizar(): boolean {
    const statusValido =  
      this.solicitacao.status == StatusSolicitacao.REDIRECIONADA ||
      this.solicitacao.status == StatusSolicitacao.PAGA 

    const usuarioResponsavel = 
      this.solicitacao.funcionario?.id === this.funcionarioLogado?.id;

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
      solicitacao: this.solicitacaoService.buscarPorId(this.id),
      funcionarioDestino: this.funcionarioService.buscarPorId(Number(this.funcionarioDestinoSelecionado))
    }).subscribe({
      next: ({ solicitacao, funcionarioDestino }) => {
        if (!funcionarioDestino || !solicitacao) return

        const agora = new Date();
        const fuso = -3;

        const historico: Historico = {
          dataHora: new Date(agora.getTime() + fuso * 60 * 60 * 1000),
          status: StatusSolicitacao.REDIRECIONADA,
          funcionario: this.funcionarioLogado,
          funcionarioDestino: funcionarioDestino
        };

        const solicitacaoAtualizada: Solicitacao = {
          ...solicitacao,
          historico: [historico],
          status: historico.status,
          funcionario: funcionarioDestino
        };

        this.solicitacaoService.redirecionarSolicitacao(solicitacaoAtualizada).subscribe({
          next: (resposta) => {
            if (resposta) {
              this.solicitacao = resposta;
              this.cancelarRedirecionamento();
            }
          },
          error: (erro) => {
            alert(`Erro ao redirecionar solicitação: ${erro}`);
          }
        });
      },
      error: (erro) => {
        alert(`Erro ao buscar dados: ${erro}`);
      }
    });
  }

  salvarManutencao() {
    if (!this.formManutencao.form.valid) return;

    this.solicitacaoService.buscarPorId(this.id).subscribe({
      next: (solicitacao) => {
        if (!solicitacao) return;

        const manutencao: Manutencao = {
          descricao: this.manutencao.descricao,
          orientacao: this.manutencao.orientacao
        };

        const agora = new Date();
        const fuso = -3;

        const historico: Historico = {
          dataHora: new Date(agora.getTime() + fuso * 60 * 60 * 1000),
          status: StatusSolicitacao.ARRUMADA,
          funcionario: this.funcionarioLogado
        };


        const solicitacaoAtualizada = {
          ...solicitacao,
          manutencao,
          status: historico.status,
          historico: [historico]
        };

        console.log("solicitacao pra manutencao", solicitacaoAtualizada)
        this.solicitacaoService.arrumarSolicitacao(solicitacaoAtualizada).subscribe({
          next: (resposta) => {
            if (resposta) {
              this.solicitacao = resposta;
              this.cancelarManutencao();
            }
          },
          error: (erro) => {
            alert('Ocorreu um erro ao salvar a manutenção. Tente novamente.');
          }
        });
      },
      error: (erro) => {
        alert('Erro ao buscar dados da solicitação.');
      }
    });
  }

  finalizarSolicitacao() {
    this.solicitacaoService.buscarPorId(this.id).subscribe({
      next: (solicitacao) => {
        if (!solicitacao) return;

        const agora = new Date();
        const fuso = -3;

        const historico: Historico = {
          dataHora: new Date(agora.getTime() + fuso * 60 * 60 * 1000),
          status: StatusSolicitacao.FINALIZADA,
          funcionario: this.funcionarioLogado
        };

        const solicitacaoAtualizada = {
          ...solicitacao,
          status: historico.status,
          historico: [historico]
        };

        this.solicitacaoService.finalizarSolicitacao(solicitacaoAtualizada).subscribe({
          next: (resposta) => {
            if (resposta) {
              this.solicitacao = resposta;
            }
          },
          error: (erro) => {
            alert('Ocorreu um erro ao finalizar solicitação. Tente novamente.');
          }
        });
      },
      error: (erro) => {
        alert('Erro ao buscar dados da solicitação.');
      }
    });
  }

/*
  listarTodos(): void {
    this.solicitacaoService.listarTodos().subscribe({
      next: (solicitacoes) => {
        this.solicitacoes = solicitacoes;
      },
      error: (err) => console.error('Erro ao listar solicitações', err)
    });
  }*/
}

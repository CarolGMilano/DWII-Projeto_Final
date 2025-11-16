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
  StatusSolicitacaoObservacao,
  Funcionario,
  UsuarioLogado,
  FuncionarioResumo,
  SolicitacaoEntrada,
} from "../../shared";

import { ClienteService, FuncionarioService, LoginService, SolicitacaoService } from '../../services';
import { ElementoLoading } from '../../components';

@Component({
  selector: 'app-tela-visualizar-detalhes',
  imports: [CommonModule, FormsModule, RouterLink, SharedModule, ElementoLoading],
  templateUrl: './tela-visualizar-detalhes.html',
  styleUrl: './tela-visualizar-detalhes.css'
})
export class TelaVisualizarDetalhes implements OnInit {
  @ViewChild('formManutencao') formManutencao! : NgForm;

  private solicitacaoService = inject(SolicitacaoService);
  private clienteService = inject(ClienteService);
  private funcionarioService = inject(FuncionarioService);
  private loginService = inject(LoginService);

  StatusSolicitacaoLabel = StatusSolicitacaoLabel;
  StatusSolicitacaoCor = StatusSolicitacaoCor;
  StatusSolicitacaoObservacao = StatusSolicitacaoObservacao;
  StatusSolicitacao = StatusSolicitacao;

  usuarioLogado: UsuarioLogado | null = this.loginService.usuarioLogado;
  funcionarioLogado!: FuncionarioResumo;
  loading: boolean = false;
  corDoLoading: string = '';

  manutencao: Manutencao = {
    descricao: '',
    orientacao: '',
  };

  funcionarios: Funcionario[] = [];
  funcionarioDestinoSelecionado!: number;

  mostrarFormulario: boolean = false;
  mostrarRedirecionamento: boolean = false;

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

    this.loading = true;
    this.corDoLoading = this.getStatusCor(StatusSolicitacao.REDIRECIONADA);

    const solicitacaoRedirecionada: SolicitacaoEntrada = {
      id: this.solicitacao.id,
      funcionario: this.funcionarioDestinoSelecionado
    };

    this.solicitacaoService.redirecionarSolicitacao(solicitacaoRedirecionada).subscribe({
      next: (resposta) => {
        if (resposta) {
          this.loading = false;
          this.solicitacao = resposta;
          this.cancelarRedirecionamento();
        }
      },
      error: (erro) => {
        this.loading = false;
        alert(`Erro ao redirecionar solicitação: ${erro}`);
      }
    });
  }

  salvarManutencao() {
    if (!this.formManutencao.form.valid) return;

    this.loading = true;
    this.corDoLoading = this.getStatusCor(StatusSolicitacao.ARRUMADA);

    const manutencao: Manutencao = {
      descricao: this.manutencao.descricao,
      orientacao: this.manutencao.orientacao
    } 

    const solicitacaoArrumada = {
      id: this.solicitacao.id,
      manutencao: manutencao,
      funcionario: this.usuarioLogado?.id
    };

    this.solicitacaoService.arrumarSolicitacao(solicitacaoArrumada).subscribe({
      next: (resposta) => {
        if (resposta) {
          this.loading = false;
          this.solicitacao = resposta;

          this.cancelarManutencao();
        }
      },
      error: (erro) => {
        this.loading = false;
        alert('Ocorreu um erro ao salvar a manutenção. Tente novamente.');
      }
    });
  }

  finalizarSolicitacao() {
    this.loading = true;
    this.corDoLoading = this.getStatusCor(StatusSolicitacao.FINALIZADA);

    const solicitacaoFinalizada: SolicitacaoEntrada = {
      id: this.solicitacao.id,
      funcionario: this.usuarioLogado?.id
    };

    this.solicitacaoService.finalizarSolicitacao(solicitacaoFinalizada).subscribe({
      next: (resposta) => {
        if (resposta) {
          this.loading = false;
          this.solicitacao = resposta;
        }
      },
      error: (erro) => {
        this.loading = false;
        alert('Ocorreu um erro ao finalizar solicitação. Tente novamente.');
      }
    });
  }
}
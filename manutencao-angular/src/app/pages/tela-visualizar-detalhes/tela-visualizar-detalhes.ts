import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { 
  SolicitacaoDetalhe, 
  EstadoSolicitacaoT, 
  EstadoSolicitacaoLabel, 
  EstadoSolicitacaoCor, 
  ManutencaoT, 
  HistoricoT, 
  Funcionario 
} from "../../models";

import { ClienteService, FuncionarioService, SolicitacaoFakeService } from '../../services';

@Component({
  selector: 'app-tela-visualizar-detalhes',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './tela-visualizar-detalhes.html',
  styleUrl: './tela-visualizar-detalhes.css'
})
export class TelaVisualizarDetalhes implements OnInit {
  @ViewChild('formManutencao') formManutencao! : NgForm;

  private solicitacaoFakeService = inject(SolicitacaoFakeService);
  private clienteService = inject(ClienteService);
  private funcionarioService = inject(FuncionarioService);

  EstadoSolicitacaoLabel = EstadoSolicitacaoLabel;
  EstadoSolicitacaoCor = EstadoSolicitacaoCor;
  EstadoSolicitacaoT = EstadoSolicitacaoT;

  funcionarioLogado = JSON.parse(localStorage.getItem('usuarioLogado')!);

  solicitacao1: SolicitacaoDetalhe = {
    equipamento: 'Ar Condicionado',
    categoria: { id: 1, nome: 'Eletrônicos' },
    descricao: 'Não está resfriando',
    status: EstadoSolicitacaoT.ORCADA,
    historico: [
      { dataHora: new Date('2025-09-01'), estado: EstadoSolicitacaoT.ABERTA, observacao: 'Solicitação recebida' },
      { dataHora: new Date('2025-09-09'), estado: EstadoSolicitacaoT.ORCADA, funcionario: this.funcionarioService.buscarPorId(1)!, observacao: 'Solicitação orçada' }
    ],
    orcamento: { 
      servico: [
        { descricao: 'Limpeza', preco: 100 },
        { descricao: 'Reparo compressor', preco: 250 }
      ],
      valorTotal: 350, 
      aprovada: false
    },
    manutencao: null,
    funcionario: this.funcionarioService.buscarPorId(1)!,
    cliente: this.clienteService.buscarPorId(1)!
  }

  solicitacao2: SolicitacaoDetalhe = {
    equipamento: 'Geladeira',
    categoria: { id: 2, nome: 'Eletrodomésticos' },
    descricao: 'Não liga',
    status: EstadoSolicitacaoT.REJEITADA,
    historico: [
      { dataHora: new Date('2025-09-01'), estado: EstadoSolicitacaoT.ABERTA, observacao: 'Solicitação recebida' },
      { dataHora: new Date('2025-09-03'), estado: EstadoSolicitacaoT.ORCADA, funcionario: this.funcionarioService.buscarPorId(2)!, observacao: 'Solicitação orçada' },
      { dataHora: new Date('2025-09-11'), estado: EstadoSolicitacaoT.REJEITADA, observacao: 'Solicitação rejeitada' }
    ],
    orcamento: { 
      servico: [
        { descricao: 'Troca placa', preco: 300 }
      ],
      valorTotal: 300, 
      aprovada: false, 
      msgRejei: 'Cliente não aprovou' 
    },
    manutencao: null,
    funcionario: this.funcionarioService.buscarPorId(2)!,
    cliente: this.clienteService.buscarPorId(2)!
  };

  solicitacao3: SolicitacaoDetalhe = {
    equipamento: 'Máquina de Lavar',
    categoria: { id: 2, nome: 'Eletrodomésticos' },
    descricao: 'Faz barulho estranho ao centrifugar',
    status: EstadoSolicitacaoT.APROVADA,
    historico: [
      { dataHora: new Date('2025-09-01'), estado: EstadoSolicitacaoT.ABERTA, observacao: 'Solicitação recebida' },
      { dataHora: new Date('2025-09-04'), estado: EstadoSolicitacaoT.ORCADA, funcionario: this.funcionarioService.buscarPorId(2)!, observacao: 'Orçamento enviado' },
      { dataHora: new Date('2025-09-10'), estado: EstadoSolicitacaoT.APROVADA, observacao: 'Orçamento aprovado' }
    ],
    orcamento: { 
      servico: [
        { descricao: 'Substituição rolamento', preco: 200 },
        { descricao: 'Troca correia', preco: 120 }
      ],
      valorTotal: 320,
      aprovada: true
    },
    manutencao: null,
    funcionario: this.funcionarioService.buscarPorId(2)!,
    cliente: this.clienteService.buscarPorId(3)!
  };

  solicitacao4: SolicitacaoDetalhe = {
    equipamento: 'Televisão',
    categoria: { id: 1, nome: 'Eletrônicos' },
    descricao: 'Imagem apagada, só sai áudio',
    status: EstadoSolicitacaoT.APROVADA,
    historico: [
      { dataHora: new Date('2025-09-01'), estado: EstadoSolicitacaoT.ABERTA, observacao: 'Solicitação recebida' },
      { dataHora: new Date('2025-09-05'), estado: EstadoSolicitacaoT.ORCADA, funcionario: this.funcionarioService.buscarPorId(1)!, observacao: 'Orçamento enviado' },
      { dataHora: new Date('2025-09-15'), estado: EstadoSolicitacaoT.APROVADA, observacao: 'Orçamento aprovado' }
    ],
    orcamento: { 
      servico: [
        { descricao: 'Troca de backlight', preco: 180 },
        { descricao: 'Reparo na placa principal', preco: 220 }
      ],
      valorTotal: 400,
      aprovada: true
    },
    manutencao: null,
    funcionario: this.funcionarioService.buscarPorId(1)!,
    cliente: this.clienteService.buscarPorId(4)!
  };

  solicitacao5: SolicitacaoDetalhe = {
    equipamento: 'Notebook',
    categoria: { id: 1, nome: 'Eletrônicos' },
    descricao: 'Tela com manchas e teclado com problemas',
    status: EstadoSolicitacaoT.PAGA,
    historico: [
      { dataHora: new Date('2025-09-02'), estado: EstadoSolicitacaoT.ABERTA, observacao: 'Solicitação recebida' },
      { dataHora: new Date('2025-09-05'), estado: EstadoSolicitacaoT.ORCADA, funcionario: this.funcionarioService.buscarPorId(2)!, observacao: 'Orçamento enviado' },
      { dataHora: new Date('2025-09-07'), estado: EstadoSolicitacaoT.APROVADA, observacao: 'Orçamento aprovado' },
      { dataHora: new Date('2025-09-12'), estado: EstadoSolicitacaoT.ARRUMADA, funcionario: this.funcionarioService.buscarPorId(2)!, observacao: 'Manutenção realizada' },
      { dataHora: new Date('2025-09-13'), estado: EstadoSolicitacaoT.PAGA, observacao: 'Manutenção paga' }
    ],
    orcamento: { 
      servico: [
        { descricao: 'Troca de tela', preco: 250 },
        { descricao: 'Substituição de bateria', preco: 320 },
        { descricao: 'Troca de dobradiça', preco: 180 },
        { descricao: 'Formatação e reinstalação do sistema', preco: 200 },
        { descricao: 'Limpeza interna completa', preco: 120 }
      ],
      valorTotal: 1070,
      aprovada: true
    },
    manutencao: null,
    funcionario: this.funcionarioService.buscarPorId(2)!,
    cliente: this.clienteService.buscarPorId(5)!
  };

  manutencao: ManutencaoT = {
    descricao: '',
    orientacoes: '',
    funcionario: this.funcionarioLogado
  };

  funcionarios: Funcionario[] = this.funcionarioService.listarTodos();
  funcionarioDestinoSelecionado!: number;

  mostrarFormulario: boolean = false;
  mostrarRedirecionamento: boolean = false;

  private route = inject(ActivatedRoute);

  id!: number;
  solicitacao!: SolicitacaoDetalhe;

  ngOnInit(): void {
    if(this.listarTodos().length == 0){
      this.solicitacaoFakeService.inserir(this.solicitacao1);
      this.solicitacaoFakeService.inserir(this.solicitacao2);
      this.solicitacaoFakeService.inserir(this.solicitacao3);
      this.solicitacaoFakeService.inserir(this.solicitacao4);
      this.solicitacaoFakeService.inserir(this.solicitacao5);
    }

    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.solicitacao = this.solicitacaoFakeService.buscarPorId(this.id);
  }

  get podeFazerManutencao(): boolean {
    const statusValido = 
      this.solicitacao.status === EstadoSolicitacaoT.APROVADA ||
      this.solicitacao.status === EstadoSolicitacaoT.REDIRECIONADA;

    const usuarioResponsavel = 
      this.solicitacao.funcionario?.idFuncionario === this.funcionarioLogado.idFuncionario;

    const orcamentoAceito = this.solicitacao.orcamento?.aprovada ?? false;

    const manutencaoNaoFeita = !this.solicitacao.historico.some(
      h => h.estado === EstadoSolicitacaoT.ARRUMADA
    );

    return statusValido && usuarioResponsavel && orcamentoAceito && manutencaoNaoFeita;
  }

  get podeRedirecionar(): boolean {
    const statusValido = 
      this.solicitacao.status == EstadoSolicitacaoT.APROVADA || 
      this.solicitacao.status == EstadoSolicitacaoT.REDIRECIONADA ||
      this.solicitacao.status == EstadoSolicitacaoT.ARRUMADA ||
      this.solicitacao.status == EstadoSolicitacaoT.PAGA 

    const usuarioResponsavel = 
      this.solicitacao.funcionario?.idFuncionario === this.funcionarioLogado.idFuncionario;

    const orcamentoAceito = this.solicitacao.orcamento?.aprovada ?? false;

    return statusValido && usuarioResponsavel && orcamentoAceito;
  }

  get podeFinalizar(): boolean {
    const statusValido =  
      this.solicitacao.status == EstadoSolicitacaoT.REDIRECIONADA ||
      this.solicitacao.status == EstadoSolicitacaoT.PAGA 

    const usuarioResponsavel = 
      this.solicitacao.funcionario?.idFuncionario === this.funcionarioLogado.idFuncionario;

    const manutencaoPaga = this.solicitacao.historico.some(
      h => h.estado === EstadoSolicitacaoT.PAGA
    );

    return statusValido && usuarioResponsavel && manutencaoPaga;
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
    if(Number(this.funcionarioDestinoSelecionado) === -1) return;

    let solicitacao: SolicitacaoDetalhe = this.solicitacaoFakeService.buscarPorId(this.id);
    let funcionarioDestinoS: Funcionario = this.funcionarioService.buscarPorId(Number(this.funcionarioDestinoSelecionado))!;

    console.log(this.funcionarioDestinoSelecionado);
    console.log(funcionarioDestinoS);

    const historico: HistoricoT = {
      dataHora: new Date(),
      estado: EstadoSolicitacaoT.REDIRECIONADA,
      funcionario: this.funcionarioLogado,
      funcionarioDestino: funcionarioDestinoS,
      observacao: 'Redirecionamento realizado'
    }

    solicitacao.historico.push(historico);
    solicitacao.status = historico.estado;
    solicitacao.funcionario = funcionarioDestinoS;

    this.solicitacaoFakeService.atualizar(solicitacao);
    
    this.solicitacao = this.solicitacaoFakeService.buscarPorId(this.id);

    this.cancelarRedirecionamento();
  }

  salvarManutencao(){
    if(!this.formManutencao.form.valid) return;

    let solicitacao: SolicitacaoDetalhe = this.solicitacaoFakeService.buscarPorId(this.id);

    const manutencao: ManutencaoT = this.manutencao;
    const historico: HistoricoT = {
      dataHora: new Date(),
      estado: EstadoSolicitacaoT.ARRUMADA,
      funcionario: this.funcionarioLogado,
      observacao: 'Manutenção concluída'
    }

    solicitacao.historico.push(historico);
    solicitacao.manutencao = manutencao;
    solicitacao.status = historico.estado;

    this.solicitacaoFakeService.atualizar(solicitacao);
    
    this.solicitacao = this.solicitacaoFakeService.buscarPorId(this.id);

    this.cancelarManutencao();
  }

  finalizarSolicitacao(){
    let solicitacao: SolicitacaoDetalhe = this.solicitacaoFakeService.buscarPorId(this.id);

    const historico: HistoricoT = {
      dataHora: new Date(),
      estado: EstadoSolicitacaoT.FINALIZADA,
      funcionario: this.funcionarioLogado,
      observacao: 'Solicitação concluída'
    }

    solicitacao.historico.push(historico);
    solicitacao.status = historico.estado;

    this.solicitacaoFakeService.atualizar(solicitacao);
    
    this.solicitacao = this.solicitacaoFakeService.buscarPorId(this.id);
  }

  listarTodos(): SolicitacaoDetalhe[]{
    return this.solicitacaoFakeService.listarTodos();
  }
}

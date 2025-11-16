import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

import { Funcionario, TipoUsuario, UsuarioLogado } from '../../shared';
import { FuncionarioService, LoginService } from '../../services';
import { ElementoLoading } from '../../components';

@Component({
  selector: 'app-tela-funcionarios',
  imports: [CommonModule, FormsModule, ElementoLoading],
  templateUrl: './tela-funcionarios.html',
  styleUrl: './tela-funcionarios.css'
})
export class TelaFuncionarios implements OnInit {
  @ViewChild('formFuncionario') formFuncionario! : NgForm;

  private funcionarioService = inject(FuncionarioService);
  private loginService = inject(LoginService);

  funcionarios: Funcionario[] = [];

  funcionario: Funcionario = {
    id: -1,
    nome: '',
    email: '',
    tipo: TipoUsuario.FUNCIONARIO,
    dataNascimento: new Date()
  };

  pesquisa: string = '';

  usuarioLogado: UsuarioLogado | null = null;
  idFuncionarioLogado: number = -1;

  senhaIncorreta: boolean = false;

  mostrarFormulario: boolean = false;
  mostrarPopupExclusao: boolean = false;

  modoFormulario: 'nenhum' | 'adicionar' | 'editar' = 'nenhum';

  dataInvalida: boolean | null = null;
  dataErroMsg: string | null = null;

  dataNascimentoStr: string = '';
  loading: boolean = false;

  ngOnInit(): void {
    this.usuarioLogado = this.loginService.usuarioLogado;

    this.listarTodos();

    if (this.usuarioLogado) {
      this.buscarFuncionarioPorUsuario(this.usuarioLogado.id);
    }
  }

  buscarFuncionarioPorUsuario(idUsuario: number): void {
    this.funcionarioService.buscarPorId(idUsuario).subscribe({
      next: (funcionario) => {
        if (funcionario) {
          this.idFuncionarioLogado = funcionario.id;
        }
      },
      error: (erro) => console.error('Erro ao buscar funcionário:', erro)
    });
  }

  abrirAdicionar() {
    this.funcionario = {
      id: -1,
      nome: '',
      email: '',
      tipo: TipoUsuario.FUNCIONARIO,
      dataNascimento: new Date()
    };


    this.dataNascimentoStr = '';

    this.modoFormulario = 'adicionar';
    this.mostrarFormulario = true;
  }

  abrirEditar(funcionario: Funcionario) {
    this.funcionario = { ...funcionario };

    if (funcionario.dataNascimento instanceof Date) {
      const data = funcionario.dataNascimento;
      const ano = data.getFullYear();
      const mes = String(data.getMonth() + 1).padStart(2, '0');
      const dia = String(data.getDate()).padStart(2, '0');
      this.dataNascimentoStr = `${ano}-${mes}-${dia}`;
    } else {
      this.dataNascimentoStr = funcionario.dataNascimento;
    }

    this.modoFormulario = 'editar';
    this.mostrarFormulario = true;
  }
  
  abrirExcluir(funcionario: Funcionario) {
    this.funcionario = { ...funcionario };
    this.mostrarPopupExclusao = true;
  }

  cancelar() {
    if(this.modoFormulario == 'adicionar' || this.modoFormulario == 'editar'){
      this.mostrarFormulario = false;
    } else {
      this.mostrarPopupExclusao = false;
    }

    this.modoFormulario = 'nenhum';
  }

  get funcionariosFiltrados(): Funcionario[] {
    if (!this.pesquisa) return this.funcionarios;

    const texto = this.pesquisa.toLowerCase();

    return this.funcionarios.filter(f =>
      f.nome.toLowerCase().includes(texto)
    );
  }

  validarData(): void {
    this.dataInvalida = null;
    this.dataErroMsg = null;

    if (!this.dataNascimentoStr) {
      this.dataInvalida = true;
      this.dataErroMsg = 'Informe a data de nascimento';
      return;
    }

    const data = new Date(this.dataNascimentoStr);
    const hoje = new Date();
    hoje.setHours(0,0,0,0);

    if (data > hoje) {
      this.dataInvalida = true;
      this.dataErroMsg = 'A data não pode ser no futuro';
      return;
    }

    const idade = hoje.getFullYear() - data.getFullYear();

    if (idade < 18) {
      this.dataInvalida = true;
      this.dataErroMsg = 'O funcionário precisa ter pelo menos 18 anos';
      return;
    }

    this.dataInvalida = false;
    this.dataErroMsg = null;
  }

  listarTodos() {
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
  }
 
  salvar():void {
    this.senhaIncorreta = false;
    if (!this.formFuncionario.form.valid) return;
    
    this.loading = true;
    
    this.funcionario.dataNascimento = new Date(this.dataNascimentoStr + 'T00:00:00');
    
    if (this.modoFormulario === 'adicionar') {
      this.funcionarioService.inserir(this.funcionario).subscribe({
        next: () => {
          this.loading = false;
          this.listarTodos();
          this.mostrarFormulario = false;
          this.formFuncionario.reset();
        },
        error: (erro) => {
          if(erro.status == 409) {
            alert(`Conflito: ${erro.error}`);
          } else if (erro.status === 500) {
            alert(`Erro interno: ${erro.error}`);
          } else {
            alert('Erro inesperado ao cadastrar funcionário.');
          }
        }
      });
    } else {
      this.funcionarioService.atualizar(this.funcionario).subscribe({
        next: () => {
          this.loading = false;
          this.listarTodos();
          this.mostrarFormulario = false;
          this.formFuncionario.reset();
        },
        error: (erro) => {
          if(erro.status == 404) {
            alert(`Não encontrado: ${erro.error}`);
          } else if (erro.status === 500) {
            alert(`Erro interno: ${erro.error}`);
          } else if (erro.status === 400) {
            this.senhaIncorreta = true;
          } else {
            alert('Erro inesperado ao atualizar funcionário.');
          }
        }
      });
    }

    this.dataInvalida = null;
    this.dataErroMsg = null;
  }

  excluir(){
    if (!this.funcionario.id) return;

    this.funcionarioService.remover(this.funcionario.id).subscribe({
      complete: () => {
        this.listarTodos();
      },
      error: (erro) => {
        if(erro.status == 404) {
          alert(`Não encontrado: ${erro.error}`);
        } else if (erro.status === 500) {
          alert(`Erro interno: ${erro.error}`);
        } else {
          alert('Erro inesperado ao excluir o funcionário.');
        }
      }
    });

    this.mostrarPopupExclusao = false;
  }
}

import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { SharedModule, Funcionario, TipoUsuario } from '../../shared';
import { FuncionarioService } from '../../services';

@Component({
  selector: 'app-tela-funcionarios',
  imports: [CommonModule, FormsModule],
  templateUrl: './tela-funcionarios.html',
  styleUrl: './tela-funcionarios.css'
})
export class TelaFuncionarios implements OnInit {
  @ViewChild('formFuncionario') formFuncionario! : NgForm;

  readonly funcionarioService = inject(FuncionarioService);

  funcionarios: Funcionario[] = [];

  funcionario: Funcionario = {
    id: -1,
    nome: '',
    email: '',
    tipo: TipoUsuario.FUNCIONARIO,
    dataNascimento: new Date()
  };

  pesquisa: string = '';

  usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado') || 'null');
  idFuncionarioLogado: number = -1;

  senhaIncorreta: boolean = false;

  mostrarFormulario: boolean = false;
  mostrarPopupExclusao: boolean = false;

  modoFormulario: 'nenhum' | 'adicionar' | 'editar' = 'nenhum';

  ngOnInit(): void {
    this.listarTodos();

    if (this.usuarioLogado) {
      this.buscarFuncionarioPorUsuario(this.usuarioLogado.id);
    }
  }

  buscarFuncionarioPorUsuario(idUsuario: number): void {
    this.funcionarioService.buscarPorUsuario(idUsuario).subscribe({
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
    this.modoFormulario = 'adicionar';
    this.mostrarFormulario = true;
  }

  abrirEditar(funcionario: Funcionario) {
    this.funcionario = { ...funcionario }; 
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
      //this.formFuncionario.reset();
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

    if (this.modoFormulario === 'adicionar') {
      this.funcionarioService.inserir(this.funcionario).subscribe({
        next: () => {
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

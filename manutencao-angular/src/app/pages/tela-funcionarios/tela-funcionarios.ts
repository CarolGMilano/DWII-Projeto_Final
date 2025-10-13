import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { SharedModule, Funcionario, TipoUsuario, Usuario } from '../../shared';
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

  usuario: Usuario = {
    nome: '',
    email: '',
    senha: '',
    tipo: TipoUsuario.FUNCIONARIO
  }

  funcionario: Funcionario = {
    usuario: this.usuario,
    dataNascimento: new Date()
  };

  pesquisa: string = '';

  mostrarFormulario: boolean = false;
  mostrarPopupExclusao: boolean = false;

  modoFormulario: 'nenhum' | 'adicionar' | 'editar' = 'nenhum';

  ngOnInit(): void {
    this.listarTodos();
  }

  abrirAdicionar() {
    this.funcionario = {
      usuario: {
        nome: '',
        email: '',
        senha: '',
        tipo: TipoUsuario.FUNCIONARIO
      },
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
      f.usuario.nome.toLowerCase().includes(texto)
    );
  }

  listarTodos() {
    this.funcionarioService.listarTodos().subscribe({
      next: (funcionarios) => {
        this.funcionarios = funcionarios;
      }
    });
  }
 
  salvar():void {
    if (!this.formFuncionario.form.valid) return;

    if (this.modoFormulario === 'adicionar') {
      this.funcionarioService.inserir(this.funcionario).subscribe({
        next: () => this.listarTodos(),
      });
    } else {
      this.funcionarioService.atualizar(this.funcionario).subscribe({
        next: () => this.listarTodos(),
      });
    }

    this.mostrarFormulario = false;
    this.formFuncionario.reset();
  }

  excluir(){
    if (!this.funcionario.id) return;

    this.funcionarioService.remover(this.funcionario.id).subscribe({
        next: () => this.listarTodos(),
      });

    this.mostrarPopupExclusao = false;
  }
}

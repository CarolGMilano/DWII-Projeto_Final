import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Funcionario } from '../../models';
import { FuncionarioS } from '../../services';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-tela-funcionarios',
  imports: [CommonModule, FormsModule],
  templateUrl: './tela-funcionarios.html',
  styleUrl: './tela-funcionarios.css'
})
export class TelaFuncionarios implements OnInit {
  @ViewChild('formFuncionario') formFuncionario! : NgForm;

  funcionarios: Funcionario[] = [];

  funcionario: Funcionario = {
    email: '',
    senha: '',
    nome: '',
    dataNascimento: new Date()
  };

  pesquisa: string = '';

  mostrarFormulario: boolean = false;
  mostrarPopupExclusao: boolean = false;

  modoFormulario: 'nenhum' | 'adicionar' | 'editar' = 'nenhum';

  readonly funcionarioService = inject(FuncionarioS);

  ngOnInit(): void {
    this.funcionarios = this.listarTodos();
  }

  abrirAdicionar() {
    this.funcionario = {
      email: '',
      senha: '',
      nome: '',
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
       this.formFuncionario.reset();
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

  listarTodos(): Funcionario[]{
    return this.funcionarioService.listarTodos();
  }

  salvar():void {
    if (!this.formFuncionario.form.valid) return;

    if (this.modoFormulario === 'adicionar') {
      this.funcionarioService.inserir(this.funcionario);
    } else {
      this.funcionarioService.atualizar(this.funcionario);
    }

    this.funcionarios = this.listarTodos();
    this.mostrarFormulario = false;
    this.formFuncionario.reset();
  }

  excluir(){
    this.funcionarioService.remover(this.funcionario.idUsuario!);

    this.funcionarios = this.listarTodos();
    this.mostrarPopupExclusao = false;
  }
}

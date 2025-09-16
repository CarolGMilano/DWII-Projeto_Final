import { Injectable } from '@angular/core';
import { Funcionario } from '../../models/index'; 

const LS_FUNCIONARIOS = "funcionarios";

@Injectable({
  providedIn: 'root'
})

export class FuncionarioService {
  private id = 0;

  listarTodos(): Funcionario[] {
    const funcionarios = localStorage[LS_FUNCIONARIOS];

    return funcionarios ? JSON.parse(funcionarios) : [];
  }

  inserir(funcionario: Funcionario): void {
    const funcionarios = this.listarTodos();

    if (funcionarios.length > 0) {
      this.id = Math.max(...funcionarios.map(funcionario => funcionario.idFuncionario || 0)) + 1;
    }
    
    funcionario.idFuncionario = this.id++;
    
    funcionarios.push(funcionario);

    localStorage[LS_FUNCIONARIOS] = JSON.stringify(funcionarios);
  }

  buscarPorId(id: number): Funcionario | undefined {
    const funcionarios = this.listarTodos();

    return funcionarios.find(funcionario => funcionario.idFuncionario === id);
  }

  atualizar(funcionario: Funcionario): void{
    const funcionarios = this.listarTodos();

    funcionarios.forEach((obj, index, lista) => {
      if(funcionario.idFuncionario === obj.idFuncionario) {
        lista[index] = funcionario;
      }
    });

    localStorage[LS_FUNCIONARIOS] = JSON.stringify(funcionarios);
  }

  remover(id: number): void {
    let funcionarios = this.listarTodos();

    funcionarios = funcionarios.filter(funcionario => funcionario.idFuncionario !== id);

    localStorage[LS_FUNCIONARIOS] = JSON.stringify(funcionarios);
  }
}

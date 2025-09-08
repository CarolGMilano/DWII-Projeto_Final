import { Injectable } from '@angular/core';
import { Funcionario } from '../../models/index'; 

const LS_Chave = "funcionarios";

@Injectable({
  providedIn: 'root'
})

export class FuncionarioS {
  private id = 0;

  listarTodos(): Funcionario[] {
    const funcionarios = localStorage[LS_Chave];

    return funcionarios ? JSON.parse(funcionarios) : [];
  }

  inserir(funcionario: Funcionario): void {
    const funcionarios = this.listarTodos();

    if (funcionarios.length > 0) {
      this.id = Math.max(...funcionarios.map(f => f.idUsuario || 0)) + 1;
    }
    
    funcionario.idUsuario = this.id++;
    
    funcionarios.push(funcionario);

    localStorage[LS_Chave] = JSON.stringify(funcionarios);
  }

  buscarPorId(id: number): Funcionario | undefined {
    const funcionarios = this.listarTodos();

    return funcionarios.find(funcionario => funcionario.idUsuario === id);
  }

  atualizar(funcionario: Funcionario): void{
    const funcionarios = this.listarTodos();

    funcionarios.forEach((obj, index, lista) => {
      if(funcionario.idUsuario === obj.idUsuario) {
        lista[index] = funcionario;
      }
    });

    localStorage[LS_Chave] = JSON.stringify(funcionarios);
  }

  remover(id: number): void {
    let funcionarios = this.listarTodos();

    funcionarios = funcionarios.filter(funcionario => funcionario.idUsuario !== id);

    localStorage[LS_Chave] = JSON.stringify(funcionarios);
  }
}

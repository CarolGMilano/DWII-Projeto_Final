import { Injectable } from '@angular/core';

import { Cliente, TipoUsuario } from '../../shared';

const LS_CLIENTES = "clientes";

@Injectable({
  providedIn: 'root'
})

export class ClienteService {
  private id = 0;

  listarTodos(): Cliente[] {
    const clientes = localStorage[LS_CLIENTES];

    return clientes ? JSON.parse(clientes) : [];
  }

  inserir(cliente: Cliente): void {
    const clientes = this.listarTodos();

    if (clientes.length > 0) {
      this.id = Math.max(...clientes.map(cliente => cliente.idCliente || 0)) + 1;
    }
    
    cliente.idCliente = this.id++;
    
    clientes.push(cliente);

    localStorage[LS_CLIENTES] = JSON.stringify(clientes);
  }

  buscarPorId(id: number): Cliente | undefined {
    const clientes = this.listarTodos();

    return clientes.find(cliente => cliente.idCliente === id);
  }
}

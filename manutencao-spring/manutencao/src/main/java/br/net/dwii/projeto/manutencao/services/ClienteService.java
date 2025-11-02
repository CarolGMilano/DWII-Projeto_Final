package br.net.dwii.projeto.manutencao.services;

import java.util.List;

import br.net.dwii.projeto.manutencao.dao.ClienteDao;
import br.net.dwii.projeto.manutencao.entity.Cliente;

public class ClienteService {
   private final ClienteDao clienteDao;

   public ClienteService(ClienteDao clienteDao) {
       this.clienteDao = clienteDao;
   }

   public Cliente buscarClientePorId(Long id) throws Exception {
       if (id == null || id <= 0) {
            throw new IllegalArgumentException("O ID do cliente deve ser um valor válido.");
        }
        
        Cliente cliente = clienteDao.getById(id);
        
        // Regra de Negócio: Lançar exceção específica se não encontrar.
        if (cliente == null) {
            // Recomenda-se criar uma exceção de negócio (ex: ResourceNotFoundException)
            throw new RuntimeException("Cliente com ID " + id + " não encontrado.");
        }
        return cliente;
   }

   public void adicionarCliente(Cliente cliente) throws Exception {
       if (cliente == null) {
           throw new IllegalArgumentException("O cliente não pode ser nulo.");
       }
       // Validações adicionais podem ser adicionadas aqui
       clienteDao.add(cliente);
   }

   public void atualizarCliente(Cliente cliente) throws Exception {
       if (cliente == null || cliente.getId() == null) {
           throw new IllegalArgumentException("O cliente ou o ID do cliente não pode ser nulo.");
       }
       // Validações adicionais podem ser adicionadas aqui
       clienteDao.update(cliente);
   }

   public void deletarCliente(Long id) throws Exception {
       if (id == null || id <= 0) {
           throw new IllegalArgumentException("O ID do cliente deve ser um valor válido.");
       }

       clienteDao.delete(buscarClientePorId(id));
   }

   public List<Cliente> listarTodosClientes() throws Exception {
       return clienteDao.getAll();
   }
}

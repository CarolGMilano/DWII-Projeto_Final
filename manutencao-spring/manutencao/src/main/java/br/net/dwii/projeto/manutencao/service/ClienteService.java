package br.net.dwii.projeto.manutencao.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.net.dwii.projeto.manutencao.model.Cliente;
import br.net.dwii.projeto.manutencao.model.Endereco;
import br.net.dwii.projeto.manutencao.model.Usuario;
import br.net.dwii.projeto.manutencao.model.dto.ClienteDTO;
import br.net.dwii.projeto.manutencao.model.dto.ClienteResumoDTO;
import br.net.dwii.projeto.manutencao.model.dto.EnderecoDTO;
import br.net.dwii.projeto.manutencao.model.dao.ClienteDao;

@Service
public class ClienteService {
  @Autowired
  private ClienteDao clienteDao;
  
  @Autowired
  private UsuarioService usuarioService;

  @Autowired
  private EnderecoService enderecoService;

  private void validarCliente(Cliente cliente) throws Exception {
    if (cliente.getCpf() == null || cliente.getCpf().isBlank()) {
      throw new Exception("CPF é obrigatório");
    } else if (!cliente.getCpf().matches("\\d+")) {
      throw new Exception("O CPF deve conter apenas números");
    }


    if (cliente.getTelefone() == null || cliente.getTelefone().isBlank()) {
      throw new Exception("Telefone é obrigatório");
    } else if (!cliente.getTelefone().matches("\\d+")) {
      throw new Exception("O telefone deve conter apenas números");
    }
  }

  public void inserirCliente(ClienteDTO clienteDTO) throws Exception {
    
    Usuario usuario = new Usuario(
      -1,
      clienteDTO.getNome(),
      clienteDTO.getEmail(),
      clienteDTO.getSenha(),
      null,
      clienteDTO.getTipo(),
      true
    );
      
    usuarioService.inserirUsuario(usuario);
    
    Cliente cliente = new Cliente(
      -1, 
      usuario.getId(),
      clienteDTO.getCpf(),
      clienteDTO.getTelefone()
    );
      
    validarCliente(cliente);

    Cliente clienteEncontrado = clienteDao.consultarPorCPF(cliente.getCpf());
    
    if (clienteEncontrado != null) {
      throw new Exception("CPF já cadastrado"); 
    }
        
    clienteDao.inserir(cliente);

    Endereco endereco = new Endereco(
      -1, 
      cliente.getId(), 
      clienteDTO.getEndereco().getCep(), 
      clienteDTO.getEndereco().getLogradouro(), 
      clienteDTO.getEndereco().getNumero(), 
      clienteDTO.getEndereco().getBairro(), 
      clienteDTO.getEndereco().getCidade(), 
      clienteDTO.getEndereco().getEstado()
    );

    enderecoService.inserirEndereco(endereco);
  }

  public ClienteDTO consultarCliente(int idCliente) throws Exception {
    Cliente clienteEncontrado = clienteDao.consultar(idCliente);
    if (clienteEncontrado == null) {
      throw new Exception("Cliente não encontrado com ID: " + idCliente);
    }
    
    Usuario usuarioEncontrado = usuarioService.consultarUsuario(clienteEncontrado.getIdUsuario());
    Endereco enderecoEncontrado = enderecoService.consultarEndereco(idCliente);

    EnderecoDTO enderecoDTO = new EnderecoDTO(
      enderecoEncontrado.getCep(), 
      enderecoEncontrado.getLogradouro(), 
      enderecoEncontrado.getNumero(), 
      enderecoEncontrado.getBairro(), 
      enderecoEncontrado.getCidade(), 
      enderecoEncontrado.getEstado()
    );

    return new ClienteDTO(
      clienteEncontrado.getId(),
      usuarioEncontrado.getNome(),
      usuarioEncontrado.getEmail(),
      usuarioEncontrado.getSenha(),
      usuarioEncontrado.getTipo(),
      clienteEncontrado.getCpf(),
      clienteEncontrado.getTelefone(),
      enderecoDTO
    );
  }

  public ClienteResumoDTO consultarClienteResumo(int idCliente) throws Exception {
    Cliente clienteEncontrado = clienteDao.consultar(idCliente);
    Usuario usuarioEncontrado = usuarioService.consultarUsuario(clienteEncontrado.getIdUsuario());
    Endereco enderecoEncontrado = enderecoService.consultarEndereco(idCliente);

    EnderecoDTO enderecoDTO = new EnderecoDTO(
      enderecoEncontrado.getCep(), 
      enderecoEncontrado.getLogradouro(), 
      enderecoEncontrado.getNumero(), 
      enderecoEncontrado.getBairro(), 
      enderecoEncontrado.getCidade(), 
      enderecoEncontrado.getEstado()
    );

    return new ClienteResumoDTO(
      usuarioEncontrado.getNome(),
      clienteEncontrado.getCpf(),
      clienteEncontrado.getTelefone(),
      enderecoDTO
    );
  }
}

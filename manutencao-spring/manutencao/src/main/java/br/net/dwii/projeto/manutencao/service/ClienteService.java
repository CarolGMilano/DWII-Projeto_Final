package br.net.dwii.projeto.manutencao.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.net.dwii.projeto.manutencao.model.Cliente;
import br.net.dwii.projeto.manutencao.model.Endereco;
import br.net.dwii.projeto.manutencao.model.Usuario;
import br.net.dwii.projeto.manutencao.model.dao.ClienteDao;
import br.net.dwii.projeto.manutencao.model.dto.ClienteDTO;
import br.net.dwii.projeto.manutencao.model.dto.ClienteResumoDTO;
import br.net.dwii.projeto.manutencao.model.dto.EnderecoDTO;
import br.net.dwii.projeto.manutencao.model.exception.ClienteNaoEncontradoException;
import br.net.dwii.projeto.manutencao.model.exception.CpfDuplicadoException;

@Service
public class ClienteService {
  @Autowired
  private ClienteDao clienteDao;
  
  @Autowired
  private UsuarioService usuarioService;

  @Autowired
  private EnderecoService enderecoService;

  private void validarCliente(Cliente cliente) {
    if (cliente.getCpf() == null || cliente.getCpf().isBlank()) {
      throw new IllegalArgumentException("CPF é obrigatório");
    } else if (!cliente.getCpf().matches("\\d+")) {
      throw new IllegalArgumentException("O CPF deve conter apenas números");
    }


    if (cliente.getTelefone() == null || cliente.getTelefone().isBlank()) {
      throw new IllegalArgumentException("Telefone é obrigatório");
    } else if (!cliente.getTelefone().matches("\\d+")) {
      throw new IllegalArgumentException("O telefone deve conter apenas números");
    }
  }

  public ClienteResumoDTO inserirCliente(ClienteDTO clienteDTO) throws Exception {
    
    Usuario usuario = new Usuario(
      -1,
      clienteDTO.getNome(),
      clienteDTO.getEmail(),
      null,
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
      throw new CpfDuplicadoException(clienteEncontrado.getCpf()); 
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

    return this.consultarClienteResumo(cliente.getId());
  }

  public int consultarIdPorCPF(String cpf) throws  Exception{
    Cliente clienteEncontrado = clienteDao.consultarPorCPF(cpf);

    if (clienteEncontrado == null) {
      throw new ClienteNaoEncontradoException();
    }

    return clienteEncontrado.getId();
  }
  
  public ClienteDTO consultarCliente(int idCliente) throws Exception {
    Cliente clienteEncontrado = clienteDao.consultar(idCliente);

    if (clienteEncontrado == null) {
      throw new ClienteNaoEncontradoException();
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
      usuarioEncontrado.getTipo(),
      clienteEncontrado.getCpf(),
      clienteEncontrado.getTelefone(),
      enderecoDTO
    );
  }

  public ClienteResumoDTO consultarClienteResumo(int idCliente) throws Exception {
    Cliente clienteEncontrado = clienteDao.consultar(idCliente);

    if(clienteEncontrado == null){
      throw new ClienteNaoEncontradoException();
    }

    Usuario usuarioEncontrado = usuarioService.consultarUsuario(clienteEncontrado.getIdUsuario());
    Endereco enderecoEncontrado = enderecoService.consultarEndereco(clienteEncontrado.getId());

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
      usuarioEncontrado.getEmail(),
      clienteEncontrado.getCpf(),
      clienteEncontrado.getTelefone(),
      enderecoDTO
    );
  }

  public ClienteResumoDTO consultarPorUsuario(int idUsuario) throws Exception {
    Cliente clienteEncontrado = clienteDao.consultarPorUsuario(idUsuario);

    if(clienteEncontrado == null){
      throw new ClienteNaoEncontradoException();
    }

    Usuario usuarioEncontrado = usuarioService.consultarUsuario(clienteEncontrado.getIdUsuario());
    Endereco enderecoEncontrado = enderecoService.consultarEndereco(clienteEncontrado.getId());

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
      usuarioEncontrado.getEmail(),
      clienteEncontrado.getCpf(),
      clienteEncontrado.getTelefone(),
      enderecoDTO
    );
  }
}

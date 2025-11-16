package br.net.dwii.projeto.manutencao.controllers;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.net.dwii.projeto.manutencao.model.dto.ClienteDTO;
import br.net.dwii.projeto.manutencao.model.dto.ClienteResumoDTO;
import br.net.dwii.projeto.manutencao.model.exception.ClienteNaoEncontradoException;
import br.net.dwii.projeto.manutencao.model.exception.CpfDuplicadoException;
import br.net.dwii.projeto.manutencao.model.exception.EmailDuplicadoException;
import br.net.dwii.projeto.manutencao.service.ClienteService;

@CrossOrigin
@RestController
public class ClienteController {

  @Autowired
  private ClienteService clienteService;
  
  @PostMapping("/clientes")
  public ResponseEntity<?> inserir(@RequestBody ClienteDTO clienteDTO){
    try {
      ClienteResumoDTO  clienteAdicionado = clienteService.inserirCliente(clienteDTO);

      return ResponseEntity.status(HttpStatus.CREATED).body(clienteAdicionado);
    } catch (EmailDuplicadoException e) {
      return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
    } catch (CpfDuplicadoException e) {
      return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao inserir cliente: " + e.getMessage());
    }
  }
  
  //Arrumar o navbar (adicionar consulta por usuário ao service)
  @GetMapping("/clientes/id")
  public ResponseEntity<?> consultarClienteResumo(@RequestParam int id){
    try{
      ClienteResumoDTO clienteEncontrado = clienteService.consultarClienteResumo(id);

      return ResponseEntity.ok(clienteEncontrado);
    } catch (ClienteNaoEncontradoException e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
    }
  }

  @GetMapping("/clientes/idUsuario")
  public ResponseEntity<?> consultarClienteResumoPorUsuario(@RequestParam int id){
    try{
      ClienteResumoDTO clienteEncontrado = clienteService.consultarClienteResumoPorUsuario(id);

      return ResponseEntity.ok(clienteEncontrado);
    } catch (ClienteNaoEncontradoException e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
    }
  }

  @GetMapping("/clientes")
  public ResponseEntity<?> listar(){
    try{
      List<ClienteResumoDTO> clientes = clienteService.listarClientes();

      return ResponseEntity.ok(clientes);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
    }
  }
}

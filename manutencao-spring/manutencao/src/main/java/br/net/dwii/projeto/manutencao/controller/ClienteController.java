package br.net.dwii.projeto.manutencao.controller;
import br.net.dwii.projeto.manutencao.service.ClienteService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import br.net.dwii.projeto.manutencao.model.dto.ClienteDTO;

@CrossOrigin
@RestController
public class ClienteController {

  @Autowired
  private ClienteService clienteService;

  @PostMapping("/clientes/inserir")
  public ResponseEntity<String> inserir(@RequestBody ClienteDTO clienteDTO){
    try {
      clienteService.inserirCliente(clienteDTO);
      return ResponseEntity.status(HttpStatus.CREATED).body("Cliente criado com sucesso");
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao inserir cliente: " + e.getMessage());
    }
  }

}

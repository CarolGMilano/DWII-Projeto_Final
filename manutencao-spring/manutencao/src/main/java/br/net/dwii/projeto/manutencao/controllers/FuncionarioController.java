package br.net.dwii.projeto.manutencao.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.net.dwii.projeto.manutencao.model.dto.FuncionarioDTO;
import br.net.dwii.projeto.manutencao.model.dto.FuncionarioResumoDTO;
import br.net.dwii.projeto.manutencao.model.exception.EmailDuplicadoException;
import br.net.dwii.projeto.manutencao.model.exception.FuncionarioNaoEncontradoException;
import br.net.dwii.projeto.manutencao.model.exception.SenhaIncorretaException;
import br.net.dwii.projeto.manutencao.service.FuncionarioService;


@CrossOrigin
@RestController
public class FuncionarioController {
  
  @Autowired
  private FuncionarioService funcionarioService;

  @PostMapping("/funcionarios")
  public ResponseEntity<?> inserir(@RequestBody FuncionarioDTO funcionarioDTO){
    try {
      FuncionarioResumoDTO  funcionarioAdicionado = funcionarioService.inserirFuncionario(funcionarioDTO);

      return ResponseEntity.status(HttpStatus.CREATED).body(funcionarioAdicionado);
    } catch (EmailDuplicadoException e) {
      return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao inserir funcionário: " + e.getMessage());
    }
  }

  @PutMapping("/funcionarios/{id}")
  public ResponseEntity<?> alterar(@PathVariable("id") int id, @RequestBody FuncionarioDTO funcionarioDTO){
    try {
      funcionarioDTO.setIdFuncionario(id);

      FuncionarioResumoDTO  funcionarioAlterado = funcionarioService.alterarFuncionario(funcionarioDTO);

      return ResponseEntity.ok(funcionarioAlterado);
    } catch (EmailDuplicadoException e) {
      return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
    } catch (SenhaIncorretaException e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao alterar funcionário: " + e.getMessage());
    }
  }

  @GetMapping("/funcionarios")
  public ResponseEntity<?> listar() {
    try {
      List<FuncionarioResumoDTO> funcionarios = funcionarioService.listarFuncionarios();

      return ResponseEntity.ok(funcionarios);
    } catch (Exception e){
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao listar funcionários: " + e.getMessage());
    }
  }

  @GetMapping("/funcionarios/{id}")
  public ResponseEntity<?> consultar(@PathVariable("id") int id) {
    try {
      FuncionarioResumoDTO funcionarioEncontrado = funcionarioService.consultarFuncionarioResumo(id);

      return ResponseEntity.ok(funcionarioEncontrado);
    } catch (FuncionarioNaoEncontradoException e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    } catch (Exception e){
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao listar funcionários: " + e.getMessage());
    }
  }

  @GetMapping("/funcionarios/por-usuario")
  public ResponseEntity<?> consultarFuncionarioPorUsuario(@RequestParam int id){
    try{
      FuncionarioResumoDTO funcionarioEncontrado = funcionarioService.consultarPorUsuario(id);

      return ResponseEntity.ok(funcionarioEncontrado);
    } catch (FuncionarioNaoEncontradoException e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
    }
  }

  @DeleteMapping("/funcionarios/{id}")
  public ResponseEntity<?> deletar(@PathVariable("id") int id){
    try{
      FuncionarioResumoDTO funcionarioDeletado = funcionarioService.consultarFuncionarioResumo(id);

      funcionarioService.deletarFuncionario(id);

      return ResponseEntity.ok(funcionarioDeletado);
    } catch (FuncionarioNaoEncontradoException e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    } catch (Exception e){
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao listar funcionários: " + e.getMessage());
    }
  }
  
}

package br.net.dwii.projeto.manutencao.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import br.net.dwii.projeto.manutencao.model.dto.LoginDTO;
import br.net.dwii.projeto.manutencao.model.dto.UsuarioLogadoDTO;
import br.net.dwii.projeto.manutencao.model.exception.SenhaIncorretaException;
import br.net.dwii.projeto.manutencao.model.exception.UsuarioNaoEncontradoException;
import br.net.dwii.projeto.manutencao.service.UsuarioService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@CrossOrigin
@RestController
public class LoginController {

  @Autowired
  private UsuarioService usuarioService;

  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO) {
    try {
      UsuarioLogadoDTO usuarioLogado = usuarioService.validarLogin(loginDTO);

      return ResponseEntity.ok(usuarioLogado);
    } catch (UsuarioNaoEncontradoException e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    } catch (SenhaIncorretaException e) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
    }    
  }  
}
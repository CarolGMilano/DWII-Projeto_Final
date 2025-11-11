package br.net.dwii.projeto.manutencao.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.net.dwii.projeto.manutencao.model.dto.SolicitacaoDTO;
import br.net.dwii.projeto.manutencao.model.dto.SolicitacaoResumoDTO;
import br.net.dwii.projeto.manutencao.model.exception.SolicitacaoNaoEncontradaException;
import br.net.dwii.projeto.manutencao.service.SolicitacaoService;

@CrossOrigin
@RestController
public class SolicitacaoController {
  @Autowired
  private SolicitacaoService solicitacaoService;

  //Aberta
  @PostMapping("/solicitacoes")
  public ResponseEntity<?> inserir(@RequestBody SolicitacaoDTO solicitacaoDTO){
    try {
      SolicitacaoDTO solicitacaoAdicionada = solicitacaoService.inserirSolicitacao(solicitacaoDTO);

      return ResponseEntity.status(HttpStatus.CREATED).body(solicitacaoAdicionada);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao inserir solicitação: " + e.getMessage());
    }
  }

  @GetMapping("/solicitacoes/{id}")
  public ResponseEntity<?> consultar(@PathVariable("id") int id){
    try {
      SolicitacaoDTO solicitacaoEncontrada = solicitacaoService.consultarSolicitacaoCompleta(id);

      return ResponseEntity.ok(solicitacaoEncontrada);
    } catch (SolicitacaoNaoEncontradaException e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao inserir solicitação: " + e.getMessage());
    }
  }

  @GetMapping("/solicitacoes/abertas")
  public ResponseEntity<?> listarAbertas() {
    try {
      List<SolicitacaoResumoDTO> solicitacoes = solicitacaoService.listarAbertas();

      return ResponseEntity.ok(solicitacoes);
    } catch (Exception e){
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao listar solicitações abertas: " + e.getMessage());
    }
  }

  @GetMapping("/solicitacoes/por-usuario")
  public ResponseEntity<?> listarPorFuncionario(@RequestParam int id) {
    try {
      List<SolicitacaoResumoDTO> solicitacoes = solicitacaoService.listarPorFuncionario(id);

      return ResponseEntity.ok(solicitacoes);
    } catch (Exception e){
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao listar solicitações: " + e.getMessage());
    }
  }

  //Orçada
  @PostMapping("/solicitacoes/{idSolicitacao}/orcamento")
  public ResponseEntity<?> orçarSolicitacao(@PathVariable("idSolicitacao") int idSolicitacao, @RequestBody SolicitacaoDTO solicitacaoDTO){
    try {
      solicitacaoDTO.setId(idSolicitacao);

      SolicitacaoDTO solicitacaoOrcada = solicitacaoService.orçarSolicitacao(solicitacaoDTO);

      return ResponseEntity.status(HttpStatus.CREATED).body(solicitacaoOrcada);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao inserir orçamento na solicitação: " + e.getMessage());
    }
  }

  //Aprovada
  @PutMapping("/solicitacoes/{idSolicitacao}/aprovar-orcamento")
  public ResponseEntity<?> aprovarOrcamento(@PathVariable("idSolicitacao") int idSolicitacao, @RequestBody SolicitacaoDTO solicitacaoDTO) {
    try {
      solicitacaoDTO.setId(idSolicitacao);

      SolicitacaoDTO solicitacaoAprovada = solicitacaoService.finalizarOrcamento(solicitacaoDTO, 3, true);

      return ResponseEntity.ok(solicitacaoAprovada);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao aprovar orçamento: " + e.getMessage());
    }
  }

  //Rejeitada
  @PutMapping("/solicitacoes/{idSolicitacao}/rejeitar-orcamento")
  public ResponseEntity<?> rejeitarOrcamento(@PathVariable("idSolicitacao") int idSolicitacao, @RequestBody SolicitacaoDTO solicitacaoDTO) {
    try {
      solicitacaoDTO.setId(idSolicitacao);

      SolicitacaoDTO solicitacaoRejeitada = solicitacaoService.finalizarOrcamento(solicitacaoDTO, 4, false);

      return ResponseEntity.ok(solicitacaoRejeitada);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao rejeitar orçamento: " + e.getMessage());
    }
  }

  //Redirecionada
  @PutMapping("/solicitacoes/{idSolicitacao}/redirecionar")
  public ResponseEntity<?> redirecionarSolicitacao(@PathVariable("idSolicitacao") int idSolicitacao, @RequestBody SolicitacaoDTO solicitacaoDTO) {
    try {
      solicitacaoDTO.setId(idSolicitacao); 

      SolicitacaoDTO solicitacaoRedirecionada = solicitacaoService.redirecionarSolicitacao(solicitacaoDTO);

      return ResponseEntity.ok(solicitacaoRedirecionada);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao redirecionar solicitação: " + e.getMessage());
    }
  }

  //Arrumada
  @PostMapping("/solicitacoes/{idSolicitacao}/manutencao")
  public ResponseEntity<?> arrumarSolicitacao(@PathVariable("idSolicitacao") int idSolicitacao, @RequestBody SolicitacaoDTO solicitacaoDTO){
    try {
      solicitacaoDTO.setId(idSolicitacao);

      SolicitacaoDTO solicitacaoOrcada = solicitacaoService.arrumarSolicitacao(solicitacaoDTO);

      return ResponseEntity.status(HttpStatus.CREATED).body(solicitacaoOrcada);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao criar manutenção na solicitação: " + e.getMessage());
    }
  }

  @PutMapping("/solicitacoes/{idSolicitacao}/pagar")
  public ResponseEntity<?> pagarSolicitacao(@PathVariable("idSolicitacao") int idSolicitacao, @RequestBody SolicitacaoDTO solicitacaoDTO) {
    try {
      solicitacaoDTO.setId(idSolicitacao); 

      SolicitacaoDTO solicitacaoRedirecionada = solicitacaoService.pagarSolicitacao(solicitacaoDTO);

      return ResponseEntity.ok(solicitacaoRedirecionada);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao pagar solicitação: " + e.getMessage());
    }
  }

  @PutMapping("/solicitacoes/{idSolicitacao}/finalizar")
  public ResponseEntity<?> finalizarSolicitacao(@PathVariable("idSolicitacao") int idSolicitacao, @RequestBody SolicitacaoDTO solicitacaoDTO) {
    try {
      solicitacaoDTO.setId(idSolicitacao); 

      SolicitacaoDTO solicitacaoRedirecionada = solicitacaoService.finalizarSolicitacao(solicitacaoDTO);

      return ResponseEntity.ok(solicitacaoRedirecionada);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao finalizar solicitação: " + e.getMessage());
    }
  }
}

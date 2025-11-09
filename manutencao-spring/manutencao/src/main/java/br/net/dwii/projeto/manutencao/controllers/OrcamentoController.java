package br.net.dwii.projeto.manutencao.controllers;

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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.net.dwii.projeto.manutencao.model.Orcamento;
import br.net.dwii.projeto.manutencao.model.dto.OrcamentoDTO;
import br.net.dwii.projeto.manutencao.service.OrcamentoService;

@CrossOrigin
@RestController
@RequestMapping("/{idSolicitacao}")
public class OrcamentoController {

    @Autowired
    private OrcamentoService orcamentoService;

    @PostMapping("/orcamentos")
    public ResponseEntity<?> inserirOrcamento(
            @PathVariable int idSolicitacao,
            @RequestBody OrcamentoDTO dto) {
        try {
            orcamentoService.inserirOrcamento(idSolicitacao, dto);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body("Orçamento criado com sucesso!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao inserir orçamento: " + e.getMessage());
        }
    }

    @GetMapping("/orcamentos/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable int id) {
        try {
            Orcamento orcamento = orcamentoService.buscarPorId(id);
            if (orcamento == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Orçamento não encontrado.");
            }
            return ResponseEntity.ok(orcamento);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao buscar orçamento: " + e.getMessage());
        }
    }

    @PutMapping("/orcamentos/{id}")
    public ResponseEntity<?> atualizarOrcamento(
            @PathVariable int id,
            @RequestBody Orcamento orcamento) {
        try {
            orcamento.setId(id);
            orcamentoService.atualizarOrcamento(orcamento);
            return ResponseEntity.ok("Orçamento atualizado com sucesso!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao atualizar orçamento: " + e.getMessage());
        }
    }

    @DeleteMapping("/orcamentos/{id}")
    public ResponseEntity<?> deletarOrcamento(@PathVariable int id) {
        try {
            orcamentoService.deletarOrcamento(id);
            return ResponseEntity.ok("Orçamento e serviços excluídos com sucesso!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao deletar orçamento: " + e.getMessage());
        }
    }
}

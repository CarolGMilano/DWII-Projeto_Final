package br.net.dwii.projeto.manutencao.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.net.dwii.projeto.manutencao.model.Servico;
import br.net.dwii.projeto.manutencao.model.dto.ServicoDTO;
import br.net.dwii.projeto.manutencao.service.ServicoService;

@RestController
@RequestMapping("/servico")
@CrossOrigin(origins = "*")
public class ServicoController {

    @Autowired
    private ServicoService servicoService;

    @PostMapping("/orcamento/{idOrcamento}")
    public ResponseEntity<?> inserirServico(
            @PathVariable int idOrcamento,
            @RequestBody ServicoDTO dto) {
        try {
            servicoService.inserirServico(idOrcamento, dto);
            return ResponseEntity.status(HttpStatus.CREATED).body("Serviço cadastrado com sucesso!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizarServico(
            @PathVariable int id,
            @RequestBody ServicoDTO dto) {
        try {
            servicoService.atualizarServico(id, dto);
            return ResponseEntity.ok("Serviço atualizado com sucesso!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletarServico(@PathVariable int id) {
        try {
            servicoService.deletarServico(id);
            return ResponseEntity.ok("Serviço removido com sucesso!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @DeleteMapping("/orcamento/{idOrcamento}")
    public ResponseEntity<?> deletarPorOrcamento(@PathVariable int idOrcamento) {
        try {
            servicoService.deletarServicosPorOrcamento(idOrcamento);
            return ResponseEntity.ok("Todos os serviços do orçamento foram removidos com sucesso!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable int id) {
        try {
            Servico servico = servicoService.buscarPorId(id);
            if (servico == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Serviço não encontrado.");
            }
            return ResponseEntity.ok(servico);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/orcamento/{idOrcamento}")
    public ResponseEntity<?> listarPorOrcamento(@PathVariable int idOrcamento) {
        try {
            List<Servico> servicos = servicoService.listarPorOrcamento(idOrcamento);
            return ResponseEntity.ok(servicos);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}

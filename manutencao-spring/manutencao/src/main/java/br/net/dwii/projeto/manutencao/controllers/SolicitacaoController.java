package br.net.dwii.projeto.manutencao.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import br.net.dwii.projeto.manutencao.model.Solicitacao;
import br.net.dwii.projeto.manutencao.service.SolicitacaoService;


public class SolicitacaoController {
    @Autowired    
    private SolicitacaoService solicitacaoService;

    public static List<Solicitacao> solicitacaos = new ArrayList<>();

    @GetMapping("/solicitacao")
    public ResponseEntity<List<Solicitacao>> listarSolicitacaos() {
        solicitacaoService.listar();
        return ResponseEntity.ok(solicitacaos);
    }

    @GetMapping("/solicitacao/{id}")
    public ResponseEntity<Solicitacao> obtersolicitacaoPorId(@PathVariable("id") int id) {
        Solicitacao s = solicitacaoService.buscarPorId(id);

        if (s == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } else {
            return ResponseEntity.ok(s);
        }

    }

    @PostMapping("/solicitacao")
    public ResponseEntity<Solicitacao> inserirsolicitacao(@RequestBody Solicitacao solicitacao) throws Exception {   
        Solicitacao s = solicitacaoService.salvar(solicitacao);

        if (s == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        } else {
            return ResponseEntity.status(HttpStatus.CREATED).body(solicitacao);
        }
        
    }

   @PutMapping("/solicitacao/{id}")
    public ResponseEntity<Solicitacao> atualizarCategoria(@PathVariable("id") Integer id, @RequestBody Solicitacao categoria) {
        Solicitacao atualizada = solicitacaoService.atualizar(categoria, id);

        if (atualizada == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        } else {
            return ResponseEntity.ok(atualizada);
        }
    }


    @DeleteMapping("/solicitacao/{id}")
    public ResponseEntity<Solicitacao> removerCategoria(@PathVariable("id") int id){
        var solicitacao = solicitacaoService.buscarPorId(id);
        boolean removida = solicitacaoService.deletar(id);

        if (removida) {
            return ResponseEntity.ok(solicitacao);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}

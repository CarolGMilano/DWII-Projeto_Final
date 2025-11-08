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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.net.dwii.projeto.manutencao.model.Categoria;
import br.net.dwii.projeto.manutencao.service.CategoriaService;

@CrossOrigin
@RestController
@RequestMapping("/categorias")
public class CategoriaController {

    @Autowired
    private CategoriaService categoriaService;

    @GetMapping
    public ResponseEntity<?> listarCategorias() {
        try {
            List<Categoria> categorias = categoriaService.listarCategorias();
            return ResponseEntity.ok(categorias);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Erro ao listar categorias: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> consultarCategoria(@PathVariable("id") int id) {
        try {
            Categoria categoria = categoriaService.consultarCategoria(id);
            return ResponseEntity.ok(categoria);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                 .body("Categoria não encontrada: " + e.getMessage());
        }
    }
    
    @PostMapping
    public ResponseEntity<?> inserirCategoria(@RequestBody Categoria categoria) {
        try {
            categoriaService.inserirCategoria(categoria);
            return ResponseEntity.status(HttpStatus.CREATED).body("Categoria inserida com sucesso!");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Erro ao inserir categoria: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizarCategoria(@PathVariable("id") int id, @RequestBody Categoria categoria) {
        try {
            categoriaService.atualizarCategoria(id, categoria);
            return ResponseEntity.ok("Categoria atualizada com sucesso!");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                 .body("Erro ao atualizar categoria: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletarCategoria(@PathVariable("id") int id) {
        try {
            categoriaService.deletarCategoria(id);
            return ResponseEntity.ok("Categoria removida com sucesso!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                 .body("Erro ao remover categoria: " + e.getMessage());
        }
    }
}

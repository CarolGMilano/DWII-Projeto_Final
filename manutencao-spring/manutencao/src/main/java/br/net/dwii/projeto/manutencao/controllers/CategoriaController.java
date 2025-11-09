package br.net.dwii.projeto.manutencao.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.net.dwii.projeto.manutencao.model.Categoria;
import br.net.dwii.projeto.manutencao.service.CategoriaService;

@CrossOrigin
@RestController
@RequestMapping("/categorias") 
public class CategoriaController {

    @Autowired    
    private CategoriaService categoriaService;

    @GetMapping
    public ResponseEntity<List<Categoria>> listarCategorias() {
        List<Categoria> categorias = categoriaService.listar();
        return ResponseEntity.ok(categorias);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Categoria> obterCategoriaPorId(@PathVariable int id) {
        Categoria c = categoriaService.buscarPorId(id);
        return (c != null)
            ? ResponseEntity.ok(c)
            : ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @PostMapping
    public ResponseEntity<Categoria> inserirCategoria(@RequestBody Categoria categoria) {   
        boolean catExiste = categoriaService.existeNome(categoria.getDescricao());

        if (catExiste) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build(); 
        }

        Categoria c = categoriaService.salvar(categoria);
        if (c == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(c);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Categoria> atualizarCategoria(@PathVariable int id, @RequestBody Categoria categoria) {
        Categoria atualizada = categoriaService.atualizar(categoria, id);
        return (atualizada != null)
            ? ResponseEntity.ok(atualizada)
            : ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removerCategoria(@PathVariable int id) {
        boolean removida = categoriaService.deletar(id);
        return removida
            ? ResponseEntity.noContent().build()
            : ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}

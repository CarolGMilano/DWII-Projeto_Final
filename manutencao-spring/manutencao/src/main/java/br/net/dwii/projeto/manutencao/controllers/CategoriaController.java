package br.net.dwii.projeto.manutencao.controllers;

import java.util.ArrayList;
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
import org.springframework.web.bind.annotation.RestController;

import br.net.dwii.projeto.manutencao.model.Categoria;
import br.net.dwii.projeto.manutencao.service.CategoriaService;



@CrossOrigin
@RestController
public class CategoriaController {
    @Autowired    
    private CategoriaService categoriaService;

    public static List<Categoria> categorias = new ArrayList<>();

    @GetMapping("/categorias")
    public ResponseEntity<List<Categoria>> listarCategorias() {
        categoriaService.listar();
        return ResponseEntity.ok(categorias);
    }

    @GetMapping("/categoria/{id}")
    public ResponseEntity<Categoria> obterCategoriaPorId(@PathVariable("id") int id) {
        Categoria c = categoriaService.buscarPorId(id);

        if (c == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } else {
            return ResponseEntity.ok(c);
        }

    }

    @PostMapping("/categorias")
    public ResponseEntity<Categoria> inserirCategoria(@RequestBody Categoria categoria) {   
        Categoria c = categoriaService.salvar(categoria);

        if (c == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        } else {
            return ResponseEntity.status(HttpStatus.CREATED).body(categoria);
        }
        
    }

   @PutMapping("/categorias/{id}")
    public ResponseEntity<Categoria> atualizarCategoria(@PathVariable("id") Integer id, @RequestBody Categoria categoria) {
        Categoria atualizada = categoriaService.atualizar(categoria, id);

        if (atualizada == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        } else {
            return ResponseEntity.ok(atualizada);
        }
    }


    @DeleteMapping("/categorias/{id}")
    public ResponseEntity<Categoria> removerCategoria(@PathVariable("id") int id){
        var categoria = categoriaService.buscarPorId(id);
        boolean removida = categoriaService.deletar(id);

        if (removida) {
            return ResponseEntity.ok(categoria);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
    
}

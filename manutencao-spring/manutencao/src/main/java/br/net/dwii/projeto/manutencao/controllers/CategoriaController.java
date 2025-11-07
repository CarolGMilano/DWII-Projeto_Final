package br.net.dwii.projeto.manutencao.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import br.net.dwii.projeto.manutencao.model.Categoria;

public class CategoriaController {
    public static List<Categoria> categorias = new ArrayList<>();

    @GetMapping("/categorias")
    public ResponseEntity<List<Categoria>> listarCategorias() {
        return ResponseEntity.ok(categorias);
    }

    @GetMapping("/categoria/{id}")
    public ResponseEntity<Categoria> obterCategoriaPorId(@PathVariable("id") int id) {
      Categoria c = categorias.stream()
        .filter(categoria -> categoria.getId() == id).findAny()
        .orElse(null);

        if(c == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}

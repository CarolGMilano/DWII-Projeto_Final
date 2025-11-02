package br.net.dwii.projeto.manutencao.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import br.net.dwii.projeto.manutencao.entity.Cliente;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;


@CrossOrigin
@RestController
public class ClienteController {
    
    @GetMapping("/cliente/{id}")
    public Cliente buscarClientePorId(@PathVariable Long id) throws Exception {
        // Implementação do método para buscar cliente por ID
        return null; // Retornar o cliente encontrado
    }

    @GetMapping("path")
    public String getMethodName(@RequestParam String param) {
        return new String();
    }
    
    
}

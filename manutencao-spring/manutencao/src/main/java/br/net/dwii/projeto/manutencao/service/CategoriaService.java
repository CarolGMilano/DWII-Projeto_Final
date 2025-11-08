package br.net.dwii.projeto.manutencao.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.net.dwii.projeto.manutencao.model.Categoria;
import br.net.dwii.projeto.manutencao.model.dao.CategoriaDao;

@Service
public class CategoriaService {

    @Autowired
    private CategoriaDao categoriaDao;

    private void validarCategoria(Categoria categoria) {
        if (categoria.getNome() == null || categoria.getNome().isBlank()) {
            throw new IllegalArgumentException("O nome da categoria é obrigatório");
        }
    }

    public void inserirCategoria(Categoria categoria) throws Exception {
        validarCategoria(categoria);

        List<Categoria> existentes = categoriaDao.getAll();
        for (Categoria c : existentes) {
            if (c.getNome().equalsIgnoreCase(categoria.getNome())) {
                throw new Exception("Já existe uma categoria com esse nome");
            }
        }

        categoriaDao.add(categoria);
    }

    public Categoria consultarCategoria(int id) throws Exception {
        Categoria categoria = categoriaDao.getById(id);
        if (categoria == null) {
            throw new Exception("Categoria não encontrada para o ID: " + id);
        }
        return categoria;
    }

    public Categoria consultarPorNome(String nome) throws Exception {
        List<Categoria> categorias = categoriaDao.getAll();
        for (Categoria c : categorias) {
            if (c.getNome().equalsIgnoreCase(nome)) {
                return c;
            }
        }
        throw new Exception("Categoria não encontrada com o nome: " + nome);
    }

    public List<Categoria> listarCategorias() throws Exception {
        return categoriaDao.getAll();
    }

    public void atualizarCategoria(int id, Categoria categoria) throws Exception {
        validarCategoria(categoria);
        Categoria existente = categoriaDao.getById(id);

        if (existente == null) {
            throw new Exception("Categoria não encontrada para o ID: " + id);
        }

        categoria.setId(id);
        categoriaDao.update(categoria);
    }

    public void deletarCategoria(int id) throws Exception {
        Categoria categoria = categoriaDao.getById(id);
        if (categoria == null) {
            throw new Exception("Categoria não encontrada para o ID: " + id);
        }
        categoriaDao.delete(categoria);
    }
}

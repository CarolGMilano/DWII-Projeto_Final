package br.net.dwii.projeto.manutencao.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.net.dwii.projeto.manutencao.intefaces.ICrud;
import br.net.dwii.projeto.manutencao.model.Categoria;
import br.net.dwii.projeto.manutencao.model.dao.CategoriaDao;

@Service
public class CategoriaService implements ICrud<Categoria> {

    @Autowired
    private CategoriaDao categoriaDao;

    @Override
    public Categoria buscarPorId(int id) {
        try {
            return categoriaDao.getById(id);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public Categoria buscarPorNome(String nome) {
        try {
            return categoriaDao.getByNome(nome);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public boolean existeId(int id) {
        return buscarPorId(id) != null;
    }

    @Override
    public boolean existeNome(String nome) {
        return buscarPorNome(nome) != null;
    }

    @Override
    public Categoria salvar(Categoria categoria) {
        try {
            if (existeNome(categoria.getDescricao())) {
                System.out.println("Categoria já existente: " + categoria.getDescricao());
                return null;
            }
            categoriaDao.add(categoria);
            return categoria;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public List<Categoria> listar() {
        try {
            return categoriaDao.getAll();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public Categoria atualizar(Categoria categoria, int id) {
        try {
            Categoria existente = categoriaDao.getById(id);
            if (existente != null) {
                existente.setDescricao(categoria.getDescricao());
                categoriaDao.update(existente);
                return existente;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public boolean deletar(int id) {
        Categoria categoria = buscarPorId(id);
        if (categoria == null) {
            return false;
        }

        try {
            categoriaDao.delete(categoria);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}

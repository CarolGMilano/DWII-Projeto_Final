package br.net.dwii.projeto.manutencao.model.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.util.List;

import org.springframework.stereotype.Repository;

import br.net.dwii.projeto.manutencao.model.Orcamento;

@Repository
public class OrcamentoDao implements DaoI<Orcamento> {

    @Override
    public void add(Orcamento objeto) throws Exception {
        Connection conn = null;
        PreparedStatement ps = null;
        String sql = "INSERT INTO orcamento (valor_total, descricao_servico, data_validade) VALUES (?, ?, ?)";

        try {
            
        } catch (Exception e) {
        }
    }

    @Override
    public List<Orcamento> getAll() throws Exception {
        throw new UnsupportedOperationException("Unimplemented method 'getAll'");
    }

    @Override
    public Orcamento getById(int id) throws Exception {
        throw new UnsupportedOperationException("Unimplemented method 'getById'");
    }

    @Override
    public void update(Orcamento objeto) throws Exception {
        throw new UnsupportedOperationException("Unimplemented method 'update'");
    }

    @Override
    public void delete(Orcamento objeto) throws Exception {
        throw new UnsupportedOperationException("Unimplemented method 'delete'");
    }
    
}

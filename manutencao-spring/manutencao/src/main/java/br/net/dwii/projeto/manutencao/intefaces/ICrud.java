package br.net.dwii.projeto.manutencao.intefaces;

import java.util.List;

public interface ICrud<T> {
    
    T buscarPorId(int id);

    T buscarPorNome(String nome);

    boolean existeId(int id);

    boolean existeNome(String nome);

    T salvar(T entidade) throws Exception;

    List<T> listar();

    boolean deletar(int id);

    T atualizar(T entidade, int id);

}

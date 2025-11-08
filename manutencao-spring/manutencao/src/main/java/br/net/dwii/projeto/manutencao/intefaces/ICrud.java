package br.net.dwii.projeto.manutencao.intefaces;

import java.util.List;

public interface ICrud<T, Id, Texto> {
    
    T buscarPorId(Id id);

    T buscarPorNome(Texto nome);

    boolean existeId(Id id);

    boolean existeNome(Texto nome);

    T salvar(T entidade);

    List<T> listar();

    boolean deletar(Id id);

    T atualizar(T entidade, Id id);

}

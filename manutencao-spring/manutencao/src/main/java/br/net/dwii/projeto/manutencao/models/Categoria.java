package br.net.dwii.projeto.manutencao.models;


@Entity
@Table(name = "categoria")
public class Categoria {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String nome;

    public long getId(){
        return id;
    }

    public void setId(){
        this.id = id;
    }

    public String getNome(){
        return nome;
    }

    public void setNome(String nome){
        this.nome = nome;
    }
}

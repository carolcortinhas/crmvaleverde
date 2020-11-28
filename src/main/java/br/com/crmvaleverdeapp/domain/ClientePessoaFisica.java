package br.com.crmvaleverdeapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A ClientePessoaFisica.
 */
@Entity
@Table(name = "cliente_pessoa_fisica")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class ClientePessoaFisica implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome")
    private String nome;

    @OneToOne
    @JoinColumn(unique = true)
    private Pessoa pessoas;

    @OneToOne(mappedBy = "clientePessoaFisica")
    @JsonIgnore
    private Cliente clientePF;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public ClientePessoaFisica nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Pessoa getPessoas() {
        return pessoas;
    }

    public ClientePessoaFisica pessoas(Pessoa pessoa) {
        this.pessoas = pessoa;
        return this;
    }

    public void setPessoas(Pessoa pessoa) {
        this.pessoas = pessoa;
    }

    public Cliente getClientePF() {
        return clientePF;
    }

    public ClientePessoaFisica clientePF(Cliente cliente) {
        this.clientePF = cliente;
        return this;
    }

    public void setClientePF(Cliente cliente) {
        this.clientePF = cliente;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ClientePessoaFisica)) {
            return false;
        }
        return id != null && id.equals(((ClientePessoaFisica) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ClientePessoaFisica{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            "}";
    }
}

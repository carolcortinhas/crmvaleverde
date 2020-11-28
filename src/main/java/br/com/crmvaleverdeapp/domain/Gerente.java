package br.com.crmvaleverdeapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Gerente.
 */
@Entity
@Table(name = "gerente")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Gerente implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome")
    private String nome;

    @ManyToOne
    @JsonIgnoreProperties(value = "gerentes", allowSetters = true)
    private Funcionario funcionario3;

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

    public Gerente nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Funcionario getFuncionario3() {
        return funcionario3;
    }

    public Gerente funcionario3(Funcionario funcionario) {
        this.funcionario3 = funcionario;
        return this;
    }

    public void setFuncionario3(Funcionario funcionario) {
        this.funcionario3 = funcionario;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Gerente)) {
            return false;
        }
        return id != null && id.equals(((Gerente) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Gerente{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            "}";
    }
}

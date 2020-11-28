package br.com.crmvaleverdeapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A RepresentantePJ.
 */
@Entity
@Table(name = "representante_pj")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class RepresentantePJ implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome")
    private String nome;

    @OneToOne
    @JoinColumn(unique = true)
    private ClientePessoaJuridica representa;

    @OneToOne
    @JoinColumn(unique = true)
    private Pessoa pessoaJuridica;

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

    public RepresentantePJ nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public ClientePessoaJuridica getRepresenta() {
        return representa;
    }

    public RepresentantePJ representa(ClientePessoaJuridica clientePessoaJuridica) {
        this.representa = clientePessoaJuridica;
        return this;
    }

    public void setRepresenta(ClientePessoaJuridica clientePessoaJuridica) {
        this.representa = clientePessoaJuridica;
    }

    public Pessoa getPessoaJuridica() {
        return pessoaJuridica;
    }

    public RepresentantePJ pessoaJuridica(Pessoa pessoa) {
        this.pessoaJuridica = pessoa;
        return this;
    }

    public void setPessoaJuridica(Pessoa pessoa) {
        this.pessoaJuridica = pessoa;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof RepresentantePJ)) {
            return false;
        }
        return id != null && id.equals(((RepresentantePJ) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "RepresentantePJ{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            "}";
    }
}

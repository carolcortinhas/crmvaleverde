package br.com.crmvaleverdeapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A ClientePessoaJuridica.
 */
@Entity
@Table(name = "cliente_pessoa_juridica")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class ClientePessoaJuridica implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "cnpj")
    private Integer cnpj;

    @Column(name = "razao_social")
    private String razaoSocial;

    @OneToOne(mappedBy = "clientePessoaJuridica")
    @JsonIgnore
    private Cliente clientePJ;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getCnpj() {
        return cnpj;
    }

    public ClientePessoaJuridica cnpj(Integer cnpj) {
        this.cnpj = cnpj;
        return this;
    }

    public void setCnpj(Integer cnpj) {
        this.cnpj = cnpj;
    }

    public String getRazaoSocial() {
        return razaoSocial;
    }

    public ClientePessoaJuridica razaoSocial(String razaoSocial) {
        this.razaoSocial = razaoSocial;
        return this;
    }

    public void setRazaoSocial(String razaoSocial) {
        this.razaoSocial = razaoSocial;
    }

    public Cliente getClientePJ() {
        return clientePJ;
    }

    public ClientePessoaJuridica clientePJ(Cliente cliente) {
        this.clientePJ = cliente;
        return this;
    }

    public void setClientePJ(Cliente cliente) {
        this.clientePJ = cliente;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ClientePessoaJuridica)) {
            return false;
        }
        return id != null && id.equals(((ClientePessoaJuridica) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ClientePessoaJuridica{" +
            "id=" + getId() +
            ", cnpj=" + getCnpj() +
            ", razaoSocial='" + getRazaoSocial() + "'" +
            "}";
    }
}

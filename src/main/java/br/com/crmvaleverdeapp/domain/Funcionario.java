package br.com.crmvaleverdeapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Funcionario.
 */
@Entity
@Table(name = "funcionario")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Funcionario implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "cod_stur")
    private Integer codStur;

    @Column(name = "nome")
    private String nome;

    @Column(name = "cargo")
    private String cargo;

    @OneToMany(mappedBy = "funcionario1")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Administrador> administradores = new HashSet<>();

    @OneToMany(mappedBy = "cadastroFuncionario")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Consultor> vendedores = new HashSet<>();

    @OneToMany(mappedBy = "funcionario3")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Gerente> gerentes = new HashSet<>();

    @OneToOne(mappedBy = "funcionario")
    @JsonIgnore
    private Pessoa pessoa;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getCodStur() {
        return codStur;
    }

    public Funcionario codStur(Integer codStur) {
        this.codStur = codStur;
        return this;
    }

    public void setCodStur(Integer codStur) {
        this.codStur = codStur;
    }

    public String getNome() {
        return nome;
    }

    public Funcionario nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCargo() {
        return cargo;
    }

    public Funcionario cargo(String cargo) {
        this.cargo = cargo;
        return this;
    }

    public void setCargo(String cargo) {
        this.cargo = cargo;
    }

    public Set<Administrador> getAdministradores() {
        return administradores;
    }

    public Funcionario administradores(Set<Administrador> administradors) {
        this.administradores = administradors;
        return this;
    }

    public Funcionario addAdministradores(Administrador administrador) {
        this.administradores.add(administrador);
        administrador.setFuncionario1(this);
        return this;
    }

    public Funcionario removeAdministradores(Administrador administrador) {
        this.administradores.remove(administrador);
        administrador.setFuncionario1(null);
        return this;
    }

    public void setAdministradores(Set<Administrador> administradors) {
        this.administradores = administradors;
    }

    public Set<Consultor> getVendedores() {
        return vendedores;
    }

    public Funcionario vendedores(Set<Consultor> consultors) {
        this.vendedores = consultors;
        return this;
    }

    public Funcionario addVendedores(Consultor consultor) {
        this.vendedores.add(consultor);
        consultor.setCadastroFuncionario(this);
        return this;
    }

    public Funcionario removeVendedores(Consultor consultor) {
        this.vendedores.remove(consultor);
        consultor.setCadastroFuncionario(null);
        return this;
    }

    public void setVendedores(Set<Consultor> consultors) {
        this.vendedores = consultors;
    }

    public Set<Gerente> getGerentes() {
        return gerentes;
    }

    public Funcionario gerentes(Set<Gerente> gerentes) {
        this.gerentes = gerentes;
        return this;
    }

    public Funcionario addGerentes(Gerente gerente) {
        this.gerentes.add(gerente);
        gerente.setFuncionario3(this);
        return this;
    }

    public Funcionario removeGerentes(Gerente gerente) {
        this.gerentes.remove(gerente);
        gerente.setFuncionario3(null);
        return this;
    }

    public void setGerentes(Set<Gerente> gerentes) {
        this.gerentes = gerentes;
    }

    public Pessoa getPessoa() {
        return pessoa;
    }

    public Funcionario pessoa(Pessoa pessoa) {
        this.pessoa = pessoa;
        return this;
    }

    public void setPessoa(Pessoa pessoa) {
        this.pessoa = pessoa;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Funcionario)) {
            return false;
        }
        return id != null && id.equals(((Funcionario) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Funcionario{" +
            "id=" + getId() +
            ", codStur=" + getCodStur() +
            ", nome='" + getNome() + "'" +
            ", cargo='" + getCargo() + "'" +
            "}";
    }
}

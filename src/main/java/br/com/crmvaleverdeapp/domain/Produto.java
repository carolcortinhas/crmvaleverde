package br.com.crmvaleverdeapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Produto.
 */
@Entity
@Table(name = "produto")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Produto implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "cod_produto_backoffice")
    private Integer codProdutoBackoffice;

    @Column(name = "valor_unitario")
    private Float valorUnitario;

    @Column(name = "nome")
    private String nome;

    @Column(name = "descricao")
    private String descricao;

    @OneToMany(mappedBy = "produto")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<ProdutoVenda> produtosVenda2s = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "produtosVenda1s", allowSetters = true)
    private Venda vendas1;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getCodProdutoBackoffice() {
        return codProdutoBackoffice;
    }

    public Produto codProdutoBackoffice(Integer codProdutoBackoffice) {
        this.codProdutoBackoffice = codProdutoBackoffice;
        return this;
    }

    public void setCodProdutoBackoffice(Integer codProdutoBackoffice) {
        this.codProdutoBackoffice = codProdutoBackoffice;
    }

    public Float getValorUnitario() {
        return valorUnitario;
    }

    public Produto valorUnitario(Float valorUnitario) {
        this.valorUnitario = valorUnitario;
        return this;
    }

    public void setValorUnitario(Float valorUnitario) {
        this.valorUnitario = valorUnitario;
    }

    public String getNome() {
        return nome;
    }

    public Produto nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public Produto descricao(String descricao) {
        this.descricao = descricao;
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Set<ProdutoVenda> getProdutosVenda2s() {
        return produtosVenda2s;
    }

    public Produto produtosVenda2s(Set<ProdutoVenda> produtoVendas) {
        this.produtosVenda2s = produtoVendas;
        return this;
    }

    public Produto addProdutosVenda2(ProdutoVenda produtoVenda) {
        this.produtosVenda2s.add(produtoVenda);
        produtoVenda.setProduto(this);
        return this;
    }

    public Produto removeProdutosVenda2(ProdutoVenda produtoVenda) {
        this.produtosVenda2s.remove(produtoVenda);
        produtoVenda.setProduto(null);
        return this;
    }

    public void setProdutosVenda2s(Set<ProdutoVenda> produtoVendas) {
        this.produtosVenda2s = produtoVendas;
    }

    public Venda getVendas1() {
        return vendas1;
    }

    public Produto vendas1(Venda venda) {
        this.vendas1 = venda;
        return this;
    }

    public void setVendas1(Venda venda) {
        this.vendas1 = venda;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Produto)) {
            return false;
        }
        return id != null && id.equals(((Produto) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Produto{" +
            "id=" + getId() +
            ", codProdutoBackoffice=" + getCodProdutoBackoffice() +
            ", valorUnitario=" + getValorUnitario() +
            ", nome='" + getNome() + "'" +
            ", descricao='" + getDescricao() + "'" +
            "}";
    }
}

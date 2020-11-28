package br.com.crmvaleverdeapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A ProdutoVenda.
 */
@Entity
@Table(name = "produto_venda")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class ProdutoVenda implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "quantidade")
    private Integer quantidade;

    @ManyToOne
    @JsonIgnoreProperties(value = "produtosVenda2s", allowSetters = true)
    private Produto produto;

    @ManyToOne
    @JsonIgnoreProperties(value = "produtosVenda3s", allowSetters = true)
    private Venda vendasProdutos;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getQuantidade() {
        return quantidade;
    }

    public ProdutoVenda quantidade(Integer quantidade) {
        this.quantidade = quantidade;
        return this;
    }

    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }

    public Produto getProduto() {
        return produto;
    }

    public ProdutoVenda produto(Produto produto) {
        this.produto = produto;
        return this;
    }

    public void setProduto(Produto produto) {
        this.produto = produto;
    }

    public Venda getVendasProdutos() {
        return vendasProdutos;
    }

    public ProdutoVenda vendasProdutos(Venda venda) {
        this.vendasProdutos = venda;
        return this;
    }

    public void setVendasProdutos(Venda venda) {
        this.vendasProdutos = venda;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ProdutoVenda)) {
            return false;
        }
        return id != null && id.equals(((ProdutoVenda) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ProdutoVenda{" +
            "id=" + getId() +
            ", quantidade=" + getQuantidade() +
            "}";
    }
}

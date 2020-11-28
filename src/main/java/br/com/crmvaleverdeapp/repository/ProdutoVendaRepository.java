package br.com.crmvaleverdeapp.repository;

import br.com.crmvaleverdeapp.domain.ProdutoVenda;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the ProdutoVenda entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProdutoVendaRepository extends JpaRepository<ProdutoVenda, Long> {
}

package br.com.crmvaleverdeapp.repository;

import br.com.crmvaleverdeapp.domain.AvaliacaoProduto;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the AvaliacaoProduto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AvaliacaoProdutoRepository extends JpaRepository<AvaliacaoProduto, Long> {
}

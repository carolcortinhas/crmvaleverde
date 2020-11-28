package br.com.crmvaleverdeapp.repository;

import br.com.crmvaleverdeapp.domain.Proposta;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Proposta entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PropostaRepository extends JpaRepository<Proposta, Long> {
}

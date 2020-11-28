package br.com.crmvaleverdeapp.repository;

import br.com.crmvaleverdeapp.domain.AvaliacaoAtendimento;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the AvaliacaoAtendimento entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AvaliacaoAtendimentoRepository extends JpaRepository<AvaliacaoAtendimento, Long> {
}

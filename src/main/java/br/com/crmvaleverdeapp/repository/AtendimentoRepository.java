package br.com.crmvaleverdeapp.repository;

import br.com.crmvaleverdeapp.domain.Atendimento;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Atendimento entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AtendimentoRepository extends JpaRepository<Atendimento, Long> {
}

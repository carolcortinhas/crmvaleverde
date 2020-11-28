package br.com.crmvaleverdeapp.repository;

import br.com.crmvaleverdeapp.domain.EtapaAtendimento;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the EtapaAtendimento entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EtapaAtendimentoRepository extends JpaRepository<EtapaAtendimento, Long> {
}

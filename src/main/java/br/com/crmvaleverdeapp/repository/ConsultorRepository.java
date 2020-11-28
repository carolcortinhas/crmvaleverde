package br.com.crmvaleverdeapp.repository;

import br.com.crmvaleverdeapp.domain.Consultor;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Consultor entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ConsultorRepository extends JpaRepository<Consultor, Long> {
}

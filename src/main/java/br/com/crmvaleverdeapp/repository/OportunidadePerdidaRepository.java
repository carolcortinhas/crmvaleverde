package br.com.crmvaleverdeapp.repository;

import br.com.crmvaleverdeapp.domain.OportunidadePerdida;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the OportunidadePerdida entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OportunidadePerdidaRepository extends JpaRepository<OportunidadePerdida, Long> {
}

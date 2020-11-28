package br.com.crmvaleverdeapp.repository;

import br.com.crmvaleverdeapp.domain.RepresentantePJ;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the RepresentantePJ entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RepresentantePJRepository extends JpaRepository<RepresentantePJ, Long> {
}

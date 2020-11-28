package br.com.crmvaleverdeapp.repository;

import br.com.crmvaleverdeapp.domain.Oportunidade;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Oportunidade entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OportunidadeRepository extends JpaRepository<Oportunidade, Long> {
}

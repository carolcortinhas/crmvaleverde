package br.com.crmvaleverdeapp.repository;

import br.com.crmvaleverdeapp.domain.Gerente;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Gerente entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GerenteRepository extends JpaRepository<Gerente, Long> {
}

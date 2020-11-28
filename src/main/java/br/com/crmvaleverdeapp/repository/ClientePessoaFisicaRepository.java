package br.com.crmvaleverdeapp.repository;

import br.com.crmvaleverdeapp.domain.ClientePessoaFisica;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the ClientePessoaFisica entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ClientePessoaFisicaRepository extends JpaRepository<ClientePessoaFisica, Long> {
}

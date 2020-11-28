package br.com.crmvaleverdeapp.repository;

import br.com.crmvaleverdeapp.domain.ClientePessoaJuridica;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the ClientePessoaJuridica entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ClientePessoaJuridicaRepository extends JpaRepository<ClientePessoaJuridica, Long> {
}

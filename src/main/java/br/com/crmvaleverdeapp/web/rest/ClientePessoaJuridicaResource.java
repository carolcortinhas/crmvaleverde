package br.com.crmvaleverdeapp.web.rest;

import br.com.crmvaleverdeapp.domain.ClientePessoaJuridica;
import br.com.crmvaleverdeapp.repository.ClientePessoaJuridicaRepository;
import br.com.crmvaleverdeapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing {@link br.com.crmvaleverdeapp.domain.ClientePessoaJuridica}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ClientePessoaJuridicaResource {

    private final Logger log = LoggerFactory.getLogger(ClientePessoaJuridicaResource.class);

    private static final String ENTITY_NAME = "clientePessoaJuridica";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ClientePessoaJuridicaRepository clientePessoaJuridicaRepository;

    public ClientePessoaJuridicaResource(ClientePessoaJuridicaRepository clientePessoaJuridicaRepository) {
        this.clientePessoaJuridicaRepository = clientePessoaJuridicaRepository;
    }

    /**
     * {@code POST  /cliente-pessoa-juridicas} : Create a new clientePessoaJuridica.
     *
     * @param clientePessoaJuridica the clientePessoaJuridica to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new clientePessoaJuridica, or with status {@code 400 (Bad Request)} if the clientePessoaJuridica has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/cliente-pessoa-juridicas")
    public ResponseEntity<ClientePessoaJuridica> createClientePessoaJuridica(@RequestBody ClientePessoaJuridica clientePessoaJuridica) throws URISyntaxException {
        log.debug("REST request to save ClientePessoaJuridica : {}", clientePessoaJuridica);
        if (clientePessoaJuridica.getId() != null) {
            throw new BadRequestAlertException("A new clientePessoaJuridica cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ClientePessoaJuridica result = clientePessoaJuridicaRepository.save(clientePessoaJuridica);
        return ResponseEntity.created(new URI("/api/cliente-pessoa-juridicas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /cliente-pessoa-juridicas} : Updates an existing clientePessoaJuridica.
     *
     * @param clientePessoaJuridica the clientePessoaJuridica to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated clientePessoaJuridica,
     * or with status {@code 400 (Bad Request)} if the clientePessoaJuridica is not valid,
     * or with status {@code 500 (Internal Server Error)} if the clientePessoaJuridica couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/cliente-pessoa-juridicas")
    public ResponseEntity<ClientePessoaJuridica> updateClientePessoaJuridica(@RequestBody ClientePessoaJuridica clientePessoaJuridica) throws URISyntaxException {
        log.debug("REST request to update ClientePessoaJuridica : {}", clientePessoaJuridica);
        if (clientePessoaJuridica.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ClientePessoaJuridica result = clientePessoaJuridicaRepository.save(clientePessoaJuridica);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, clientePessoaJuridica.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /cliente-pessoa-juridicas} : get all the clientePessoaJuridicas.
     *
     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of clientePessoaJuridicas in body.
     */
    @GetMapping("/cliente-pessoa-juridicas")
    public List<ClientePessoaJuridica> getAllClientePessoaJuridicas(@RequestParam(required = false) String filter) {
        if ("clientepj-is-null".equals(filter)) {
            log.debug("REST request to get all ClientePessoaJuridicas where clientePJ is null");
            return StreamSupport
                .stream(clientePessoaJuridicaRepository.findAll().spliterator(), false)
                .filter(clientePessoaJuridica -> clientePessoaJuridica.getClientePJ() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all ClientePessoaJuridicas");
        return clientePessoaJuridicaRepository.findAll();
    }

    /**
     * {@code GET  /cliente-pessoa-juridicas/:id} : get the "id" clientePessoaJuridica.
     *
     * @param id the id of the clientePessoaJuridica to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the clientePessoaJuridica, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/cliente-pessoa-juridicas/{id}")
    public ResponseEntity<ClientePessoaJuridica> getClientePessoaJuridica(@PathVariable Long id) {
        log.debug("REST request to get ClientePessoaJuridica : {}", id);
        Optional<ClientePessoaJuridica> clientePessoaJuridica = clientePessoaJuridicaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(clientePessoaJuridica);
    }

    /**
     * {@code DELETE  /cliente-pessoa-juridicas/:id} : delete the "id" clientePessoaJuridica.
     *
     * @param id the id of the clientePessoaJuridica to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/cliente-pessoa-juridicas/{id}")
    public ResponseEntity<Void> deleteClientePessoaJuridica(@PathVariable Long id) {
        log.debug("REST request to delete ClientePessoaJuridica : {}", id);
        clientePessoaJuridicaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}

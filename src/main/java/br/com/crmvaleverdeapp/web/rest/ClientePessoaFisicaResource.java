package br.com.crmvaleverdeapp.web.rest;

import br.com.crmvaleverdeapp.domain.ClientePessoaFisica;
import br.com.crmvaleverdeapp.repository.ClientePessoaFisicaRepository;
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
 * REST controller for managing {@link br.com.crmvaleverdeapp.domain.ClientePessoaFisica}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ClientePessoaFisicaResource {

    private final Logger log = LoggerFactory.getLogger(ClientePessoaFisicaResource.class);

    private static final String ENTITY_NAME = "clientePessoaFisica";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ClientePessoaFisicaRepository clientePessoaFisicaRepository;

    public ClientePessoaFisicaResource(ClientePessoaFisicaRepository clientePessoaFisicaRepository) {
        this.clientePessoaFisicaRepository = clientePessoaFisicaRepository;
    }

    /**
     * {@code POST  /cliente-pessoa-fisicas} : Create a new clientePessoaFisica.
     *
     * @param clientePessoaFisica the clientePessoaFisica to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new clientePessoaFisica, or with status {@code 400 (Bad Request)} if the clientePessoaFisica has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/cliente-pessoa-fisicas")
    public ResponseEntity<ClientePessoaFisica> createClientePessoaFisica(@RequestBody ClientePessoaFisica clientePessoaFisica) throws URISyntaxException {
        log.debug("REST request to save ClientePessoaFisica : {}", clientePessoaFisica);
        if (clientePessoaFisica.getId() != null) {
            throw new BadRequestAlertException("A new clientePessoaFisica cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ClientePessoaFisica result = clientePessoaFisicaRepository.save(clientePessoaFisica);
        return ResponseEntity.created(new URI("/api/cliente-pessoa-fisicas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /cliente-pessoa-fisicas} : Updates an existing clientePessoaFisica.
     *
     * @param clientePessoaFisica the clientePessoaFisica to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated clientePessoaFisica,
     * or with status {@code 400 (Bad Request)} if the clientePessoaFisica is not valid,
     * or with status {@code 500 (Internal Server Error)} if the clientePessoaFisica couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/cliente-pessoa-fisicas")
    public ResponseEntity<ClientePessoaFisica> updateClientePessoaFisica(@RequestBody ClientePessoaFisica clientePessoaFisica) throws URISyntaxException {
        log.debug("REST request to update ClientePessoaFisica : {}", clientePessoaFisica);
        if (clientePessoaFisica.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ClientePessoaFisica result = clientePessoaFisicaRepository.save(clientePessoaFisica);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, clientePessoaFisica.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /cliente-pessoa-fisicas} : get all the clientePessoaFisicas.
     *
     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of clientePessoaFisicas in body.
     */
    @GetMapping("/cliente-pessoa-fisicas")
    public List<ClientePessoaFisica> getAllClientePessoaFisicas(@RequestParam(required = false) String filter) {
        if ("clientepf-is-null".equals(filter)) {
            log.debug("REST request to get all ClientePessoaFisicas where clientePF is null");
            return StreamSupport
                .stream(clientePessoaFisicaRepository.findAll().spliterator(), false)
                .filter(clientePessoaFisica -> clientePessoaFisica.getClientePF() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all ClientePessoaFisicas");
        return clientePessoaFisicaRepository.findAll();
    }

    /**
     * {@code GET  /cliente-pessoa-fisicas/:id} : get the "id" clientePessoaFisica.
     *
     * @param id the id of the clientePessoaFisica to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the clientePessoaFisica, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/cliente-pessoa-fisicas/{id}")
    public ResponseEntity<ClientePessoaFisica> getClientePessoaFisica(@PathVariable Long id) {
        log.debug("REST request to get ClientePessoaFisica : {}", id);
        Optional<ClientePessoaFisica> clientePessoaFisica = clientePessoaFisicaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(clientePessoaFisica);
    }

    /**
     * {@code DELETE  /cliente-pessoa-fisicas/:id} : delete the "id" clientePessoaFisica.
     *
     * @param id the id of the clientePessoaFisica to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/cliente-pessoa-fisicas/{id}")
    public ResponseEntity<Void> deleteClientePessoaFisica(@PathVariable Long id) {
        log.debug("REST request to delete ClientePessoaFisica : {}", id);
        clientePessoaFisicaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}

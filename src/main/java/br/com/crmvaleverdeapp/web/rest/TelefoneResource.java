package br.com.crmvaleverdeapp.web.rest;

import br.com.crmvaleverdeapp.domain.Telefone;
import br.com.crmvaleverdeapp.repository.TelefoneRepository;
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
 * REST controller for managing {@link br.com.crmvaleverdeapp.domain.Telefone}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class TelefoneResource {

    private final Logger log = LoggerFactory.getLogger(TelefoneResource.class);

    private static final String ENTITY_NAME = "telefone";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TelefoneRepository telefoneRepository;

    public TelefoneResource(TelefoneRepository telefoneRepository) {
        this.telefoneRepository = telefoneRepository;
    }

    /**
     * {@code POST  /telefones} : Create a new telefone.
     *
     * @param telefone the telefone to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new telefone, or with status {@code 400 (Bad Request)} if the telefone has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/telefones")
    public ResponseEntity<Telefone> createTelefone(@RequestBody Telefone telefone) throws URISyntaxException {
        log.debug("REST request to save Telefone : {}", telefone);
        if (telefone.getId() != null) {
            throw new BadRequestAlertException("A new telefone cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Telefone result = telefoneRepository.save(telefone);
        return ResponseEntity.created(new URI("/api/telefones/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /telefones} : Updates an existing telefone.
     *
     * @param telefone the telefone to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated telefone,
     * or with status {@code 400 (Bad Request)} if the telefone is not valid,
     * or with status {@code 500 (Internal Server Error)} if the telefone couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/telefones")
    public ResponseEntity<Telefone> updateTelefone(@RequestBody Telefone telefone) throws URISyntaxException {
        log.debug("REST request to update Telefone : {}", telefone);
        if (telefone.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Telefone result = telefoneRepository.save(telefone);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, telefone.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /telefones} : get all the telefones.
     *
     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of telefones in body.
     */
    @GetMapping("/telefones")
    public List<Telefone> getAllTelefones(@RequestParam(required = false) String filter) {
        if ("contato-is-null".equals(filter)) {
            log.debug("REST request to get all Telefones where contato is null");
            return StreamSupport
                .stream(telefoneRepository.findAll().spliterator(), false)
                .filter(telefone -> telefone.getContato() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all Telefones");
        return telefoneRepository.findAll();
    }

    /**
     * {@code GET  /telefones/:id} : get the "id" telefone.
     *
     * @param id the id of the telefone to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the telefone, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/telefones/{id}")
    public ResponseEntity<Telefone> getTelefone(@PathVariable Long id) {
        log.debug("REST request to get Telefone : {}", id);
        Optional<Telefone> telefone = telefoneRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(telefone);
    }

    /**
     * {@code DELETE  /telefones/:id} : delete the "id" telefone.
     *
     * @param id the id of the telefone to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/telefones/{id}")
    public ResponseEntity<Void> deleteTelefone(@PathVariable Long id) {
        log.debug("REST request to delete Telefone : {}", id);
        telefoneRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}

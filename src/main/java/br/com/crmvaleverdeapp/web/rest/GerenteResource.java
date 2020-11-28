package br.com.crmvaleverdeapp.web.rest;

import br.com.crmvaleverdeapp.domain.Gerente;
import br.com.crmvaleverdeapp.repository.GerenteRepository;
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

/**
 * REST controller for managing {@link br.com.crmvaleverdeapp.domain.Gerente}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class GerenteResource {

    private final Logger log = LoggerFactory.getLogger(GerenteResource.class);

    private static final String ENTITY_NAME = "gerente";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final GerenteRepository gerenteRepository;

    public GerenteResource(GerenteRepository gerenteRepository) {
        this.gerenteRepository = gerenteRepository;
    }

    /**
     * {@code POST  /gerentes} : Create a new gerente.
     *
     * @param gerente the gerente to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new gerente, or with status {@code 400 (Bad Request)} if the gerente has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/gerentes")
    public ResponseEntity<Gerente> createGerente(@RequestBody Gerente gerente) throws URISyntaxException {
        log.debug("REST request to save Gerente : {}", gerente);
        if (gerente.getId() != null) {
            throw new BadRequestAlertException("A new gerente cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Gerente result = gerenteRepository.save(gerente);
        return ResponseEntity.created(new URI("/api/gerentes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /gerentes} : Updates an existing gerente.
     *
     * @param gerente the gerente to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated gerente,
     * or with status {@code 400 (Bad Request)} if the gerente is not valid,
     * or with status {@code 500 (Internal Server Error)} if the gerente couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/gerentes")
    public ResponseEntity<Gerente> updateGerente(@RequestBody Gerente gerente) throws URISyntaxException {
        log.debug("REST request to update Gerente : {}", gerente);
        if (gerente.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Gerente result = gerenteRepository.save(gerente);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, gerente.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /gerentes} : get all the gerentes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of gerentes in body.
     */
    @GetMapping("/gerentes")
    public List<Gerente> getAllGerentes() {
        log.debug("REST request to get all Gerentes");
        return gerenteRepository.findAll();
    }

    /**
     * {@code GET  /gerentes/:id} : get the "id" gerente.
     *
     * @param id the id of the gerente to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the gerente, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/gerentes/{id}")
    public ResponseEntity<Gerente> getGerente(@PathVariable Long id) {
        log.debug("REST request to get Gerente : {}", id);
        Optional<Gerente> gerente = gerenteRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(gerente);
    }

    /**
     * {@code DELETE  /gerentes/:id} : delete the "id" gerente.
     *
     * @param id the id of the gerente to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/gerentes/{id}")
    public ResponseEntity<Void> deleteGerente(@PathVariable Long id) {
        log.debug("REST request to delete Gerente : {}", id);
        gerenteRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}

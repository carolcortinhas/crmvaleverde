package br.com.crmvaleverdeapp.web.rest;

import br.com.crmvaleverdeapp.domain.RepresentantePJ;
import br.com.crmvaleverdeapp.repository.RepresentantePJRepository;
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
 * REST controller for managing {@link br.com.crmvaleverdeapp.domain.RepresentantePJ}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class RepresentantePJResource {

    private final Logger log = LoggerFactory.getLogger(RepresentantePJResource.class);

    private static final String ENTITY_NAME = "representantePJ";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RepresentantePJRepository representantePJRepository;

    public RepresentantePJResource(RepresentantePJRepository representantePJRepository) {
        this.representantePJRepository = representantePJRepository;
    }

    /**
     * {@code POST  /representante-pjs} : Create a new representantePJ.
     *
     * @param representantePJ the representantePJ to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new representantePJ, or with status {@code 400 (Bad Request)} if the representantePJ has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/representante-pjs")
    public ResponseEntity<RepresentantePJ> createRepresentantePJ(@RequestBody RepresentantePJ representantePJ) throws URISyntaxException {
        log.debug("REST request to save RepresentantePJ : {}", representantePJ);
        if (representantePJ.getId() != null) {
            throw new BadRequestAlertException("A new representantePJ cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RepresentantePJ result = representantePJRepository.save(representantePJ);
        return ResponseEntity.created(new URI("/api/representante-pjs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /representante-pjs} : Updates an existing representantePJ.
     *
     * @param representantePJ the representantePJ to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated representantePJ,
     * or with status {@code 400 (Bad Request)} if the representantePJ is not valid,
     * or with status {@code 500 (Internal Server Error)} if the representantePJ couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/representante-pjs")
    public ResponseEntity<RepresentantePJ> updateRepresentantePJ(@RequestBody RepresentantePJ representantePJ) throws URISyntaxException {
        log.debug("REST request to update RepresentantePJ : {}", representantePJ);
        if (representantePJ.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        RepresentantePJ result = representantePJRepository.save(representantePJ);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, representantePJ.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /representante-pjs} : get all the representantePJS.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of representantePJS in body.
     */
    @GetMapping("/representante-pjs")
    public List<RepresentantePJ> getAllRepresentantePJS() {
        log.debug("REST request to get all RepresentantePJS");
        return representantePJRepository.findAll();
    }

    /**
     * {@code GET  /representante-pjs/:id} : get the "id" representantePJ.
     *
     * @param id the id of the representantePJ to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the representantePJ, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/representante-pjs/{id}")
    public ResponseEntity<RepresentantePJ> getRepresentantePJ(@PathVariable Long id) {
        log.debug("REST request to get RepresentantePJ : {}", id);
        Optional<RepresentantePJ> representantePJ = representantePJRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(representantePJ);
    }

    /**
     * {@code DELETE  /representante-pjs/:id} : delete the "id" representantePJ.
     *
     * @param id the id of the representantePJ to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/representante-pjs/{id}")
    public ResponseEntity<Void> deleteRepresentantePJ(@PathVariable Long id) {
        log.debug("REST request to delete RepresentantePJ : {}", id);
        representantePJRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}

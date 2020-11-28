package br.com.crmvaleverdeapp.web.rest;

import br.com.crmvaleverdeapp.domain.Consultor;
import br.com.crmvaleverdeapp.repository.ConsultorRepository;
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
 * REST controller for managing {@link br.com.crmvaleverdeapp.domain.Consultor}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ConsultorResource {

    private final Logger log = LoggerFactory.getLogger(ConsultorResource.class);

    private static final String ENTITY_NAME = "consultor";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ConsultorRepository consultorRepository;

    public ConsultorResource(ConsultorRepository consultorRepository) {
        this.consultorRepository = consultorRepository;
    }

    /**
     * {@code POST  /consultors} : Create a new consultor.
     *
     * @param consultor the consultor to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new consultor, or with status {@code 400 (Bad Request)} if the consultor has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/consultors")
    public ResponseEntity<Consultor> createConsultor(@RequestBody Consultor consultor) throws URISyntaxException {
        log.debug("REST request to save Consultor : {}", consultor);
        if (consultor.getId() != null) {
            throw new BadRequestAlertException("A new consultor cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Consultor result = consultorRepository.save(consultor);
        return ResponseEntity.created(new URI("/api/consultors/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /consultors} : Updates an existing consultor.
     *
     * @param consultor the consultor to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated consultor,
     * or with status {@code 400 (Bad Request)} if the consultor is not valid,
     * or with status {@code 500 (Internal Server Error)} if the consultor couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/consultors")
    public ResponseEntity<Consultor> updateConsultor(@RequestBody Consultor consultor) throws URISyntaxException {
        log.debug("REST request to update Consultor : {}", consultor);
        if (consultor.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Consultor result = consultorRepository.save(consultor);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, consultor.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /consultors} : get all the consultors.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of consultors in body.
     */
    @GetMapping("/consultors")
    public List<Consultor> getAllConsultors() {
        log.debug("REST request to get all Consultors");
        return consultorRepository.findAll();
    }

    /**
     * {@code GET  /consultors/:id} : get the "id" consultor.
     *
     * @param id the id of the consultor to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the consultor, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/consultors/{id}")
    public ResponseEntity<Consultor> getConsultor(@PathVariable Long id) {
        log.debug("REST request to get Consultor : {}", id);
        Optional<Consultor> consultor = consultorRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(consultor);
    }

    /**
     * {@code DELETE  /consultors/:id} : delete the "id" consultor.
     *
     * @param id the id of the consultor to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/consultors/{id}")
    public ResponseEntity<Void> deleteConsultor(@PathVariable Long id) {
        log.debug("REST request to delete Consultor : {}", id);
        consultorRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}

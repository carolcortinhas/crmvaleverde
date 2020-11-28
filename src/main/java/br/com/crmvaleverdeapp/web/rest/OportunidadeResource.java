package br.com.crmvaleverdeapp.web.rest;

import br.com.crmvaleverdeapp.domain.Oportunidade;
import br.com.crmvaleverdeapp.repository.OportunidadeRepository;
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
 * REST controller for managing {@link br.com.crmvaleverdeapp.domain.Oportunidade}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class OportunidadeResource {

    private final Logger log = LoggerFactory.getLogger(OportunidadeResource.class);

    private static final String ENTITY_NAME = "oportunidade";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final OportunidadeRepository oportunidadeRepository;

    public OportunidadeResource(OportunidadeRepository oportunidadeRepository) {
        this.oportunidadeRepository = oportunidadeRepository;
    }

    /**
     * {@code POST  /oportunidades} : Create a new oportunidade.
     *
     * @param oportunidade the oportunidade to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new oportunidade, or with status {@code 400 (Bad Request)} if the oportunidade has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/oportunidades")
    public ResponseEntity<Oportunidade> createOportunidade(@RequestBody Oportunidade oportunidade) throws URISyntaxException {
        log.debug("REST request to save Oportunidade : {}", oportunidade);
        if (oportunidade.getId() != null) {
            throw new BadRequestAlertException("A new oportunidade cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Oportunidade result = oportunidadeRepository.save(oportunidade);
        return ResponseEntity.created(new URI("/api/oportunidades/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /oportunidades} : Updates an existing oportunidade.
     *
     * @param oportunidade the oportunidade to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated oportunidade,
     * or with status {@code 400 (Bad Request)} if the oportunidade is not valid,
     * or with status {@code 500 (Internal Server Error)} if the oportunidade couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/oportunidades")
    public ResponseEntity<Oportunidade> updateOportunidade(@RequestBody Oportunidade oportunidade) throws URISyntaxException {
        log.debug("REST request to update Oportunidade : {}", oportunidade);
        if (oportunidade.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Oportunidade result = oportunidadeRepository.save(oportunidade);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, oportunidade.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /oportunidades} : get all the oportunidades.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of oportunidades in body.
     */
    @GetMapping("/oportunidades")
    public List<Oportunidade> getAllOportunidades() {
        log.debug("REST request to get all Oportunidades");
        return oportunidadeRepository.findAll();
    }

    /**
     * {@code GET  /oportunidades/:id} : get the "id" oportunidade.
     *
     * @param id the id of the oportunidade to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the oportunidade, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/oportunidades/{id}")
    public ResponseEntity<Oportunidade> getOportunidade(@PathVariable Long id) {
        log.debug("REST request to get Oportunidade : {}", id);
        Optional<Oportunidade> oportunidade = oportunidadeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(oportunidade);
    }

    /**
     * {@code DELETE  /oportunidades/:id} : delete the "id" oportunidade.
     *
     * @param id the id of the oportunidade to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/oportunidades/{id}")
    public ResponseEntity<Void> deleteOportunidade(@PathVariable Long id) {
        log.debug("REST request to delete Oportunidade : {}", id);
        oportunidadeRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}

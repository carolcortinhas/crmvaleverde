package br.com.crmvaleverdeapp.web.rest;

import br.com.crmvaleverdeapp.domain.OportunidadePerdida;
import br.com.crmvaleverdeapp.repository.OportunidadePerdidaRepository;
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
 * REST controller for managing {@link br.com.crmvaleverdeapp.domain.OportunidadePerdida}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class OportunidadePerdidaResource {

    private final Logger log = LoggerFactory.getLogger(OportunidadePerdidaResource.class);

    private static final String ENTITY_NAME = "oportunidadePerdida";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final OportunidadePerdidaRepository oportunidadePerdidaRepository;

    public OportunidadePerdidaResource(OportunidadePerdidaRepository oportunidadePerdidaRepository) {
        this.oportunidadePerdidaRepository = oportunidadePerdidaRepository;
    }

    /**
     * {@code POST  /oportunidade-perdidas} : Create a new oportunidadePerdida.
     *
     * @param oportunidadePerdida the oportunidadePerdida to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new oportunidadePerdida, or with status {@code 400 (Bad Request)} if the oportunidadePerdida has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/oportunidade-perdidas")
    public ResponseEntity<OportunidadePerdida> createOportunidadePerdida(@RequestBody OportunidadePerdida oportunidadePerdida) throws URISyntaxException {
        log.debug("REST request to save OportunidadePerdida : {}", oportunidadePerdida);
        if (oportunidadePerdida.getId() != null) {
            throw new BadRequestAlertException("A new oportunidadePerdida cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OportunidadePerdida result = oportunidadePerdidaRepository.save(oportunidadePerdida);
        return ResponseEntity.created(new URI("/api/oportunidade-perdidas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /oportunidade-perdidas} : Updates an existing oportunidadePerdida.
     *
     * @param oportunidadePerdida the oportunidadePerdida to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated oportunidadePerdida,
     * or with status {@code 400 (Bad Request)} if the oportunidadePerdida is not valid,
     * or with status {@code 500 (Internal Server Error)} if the oportunidadePerdida couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/oportunidade-perdidas")
    public ResponseEntity<OportunidadePerdida> updateOportunidadePerdida(@RequestBody OportunidadePerdida oportunidadePerdida) throws URISyntaxException {
        log.debug("REST request to update OportunidadePerdida : {}", oportunidadePerdida);
        if (oportunidadePerdida.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        OportunidadePerdida result = oportunidadePerdidaRepository.save(oportunidadePerdida);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, oportunidadePerdida.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /oportunidade-perdidas} : get all the oportunidadePerdidas.
     *
     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of oportunidadePerdidas in body.
     */
    @GetMapping("/oportunidade-perdidas")
    public List<OportunidadePerdida> getAllOportunidadePerdidas(@RequestParam(required = false) String filter) {
        if ("vendanaoefetuada-is-null".equals(filter)) {
            log.debug("REST request to get all OportunidadePerdidas where vendaNaoEfetuada is null");
            return StreamSupport
                .stream(oportunidadePerdidaRepository.findAll().spliterator(), false)
                .filter(oportunidadePerdida -> oportunidadePerdida.getVendaNaoEfetuada() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all OportunidadePerdidas");
        return oportunidadePerdidaRepository.findAll();
    }

    /**
     * {@code GET  /oportunidade-perdidas/:id} : get the "id" oportunidadePerdida.
     *
     * @param id the id of the oportunidadePerdida to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the oportunidadePerdida, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/oportunidade-perdidas/{id}")
    public ResponseEntity<OportunidadePerdida> getOportunidadePerdida(@PathVariable Long id) {
        log.debug("REST request to get OportunidadePerdida : {}", id);
        Optional<OportunidadePerdida> oportunidadePerdida = oportunidadePerdidaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(oportunidadePerdida);
    }

    /**
     * {@code DELETE  /oportunidade-perdidas/:id} : delete the "id" oportunidadePerdida.
     *
     * @param id the id of the oportunidadePerdida to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/oportunidade-perdidas/{id}")
    public ResponseEntity<Void> deleteOportunidadePerdida(@PathVariable Long id) {
        log.debug("REST request to delete OportunidadePerdida : {}", id);
        oportunidadePerdidaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}

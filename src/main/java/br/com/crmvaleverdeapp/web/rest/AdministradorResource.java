package br.com.crmvaleverdeapp.web.rest;

import br.com.crmvaleverdeapp.domain.Administrador;
import br.com.crmvaleverdeapp.repository.AdministradorRepository;
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
 * REST controller for managing {@link br.com.crmvaleverdeapp.domain.Administrador}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class AdministradorResource {

    private final Logger log = LoggerFactory.getLogger(AdministradorResource.class);

    private static final String ENTITY_NAME = "administrador";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AdministradorRepository administradorRepository;

    public AdministradorResource(AdministradorRepository administradorRepository) {
        this.administradorRepository = administradorRepository;
    }

    /**
     * {@code POST  /administradors} : Create a new administrador.
     *
     * @param administrador the administrador to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new administrador, or with status {@code 400 (Bad Request)} if the administrador has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/administradors")
    public ResponseEntity<Administrador> createAdministrador(@RequestBody Administrador administrador) throws URISyntaxException {
        log.debug("REST request to save Administrador : {}", administrador);
        if (administrador.getId() != null) {
            throw new BadRequestAlertException("A new administrador cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Administrador result = administradorRepository.save(administrador);
        return ResponseEntity.created(new URI("/api/administradors/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /administradors} : Updates an existing administrador.
     *
     * @param administrador the administrador to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated administrador,
     * or with status {@code 400 (Bad Request)} if the administrador is not valid,
     * or with status {@code 500 (Internal Server Error)} if the administrador couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/administradors")
    public ResponseEntity<Administrador> updateAdministrador(@RequestBody Administrador administrador) throws URISyntaxException {
        log.debug("REST request to update Administrador : {}", administrador);
        if (administrador.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Administrador result = administradorRepository.save(administrador);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, administrador.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /administradors} : get all the administradors.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of administradors in body.
     */
    @GetMapping("/administradors")
    public List<Administrador> getAllAdministradors() {
        log.debug("REST request to get all Administradors");
        return administradorRepository.findAll();
    }

    /**
     * {@code GET  /administradors/:id} : get the "id" administrador.
     *
     * @param id the id of the administrador to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the administrador, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/administradors/{id}")
    public ResponseEntity<Administrador> getAdministrador(@PathVariable Long id) {
        log.debug("REST request to get Administrador : {}", id);
        Optional<Administrador> administrador = administradorRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(administrador);
    }

    /**
     * {@code DELETE  /administradors/:id} : delete the "id" administrador.
     *
     * @param id the id of the administrador to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/administradors/{id}")
    public ResponseEntity<Void> deleteAdministrador(@PathVariable Long id) {
        log.debug("REST request to delete Administrador : {}", id);
        administradorRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}

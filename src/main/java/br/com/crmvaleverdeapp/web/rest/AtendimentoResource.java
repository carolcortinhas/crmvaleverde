package br.com.crmvaleverdeapp.web.rest;

import br.com.crmvaleverdeapp.domain.Atendimento;
import br.com.crmvaleverdeapp.repository.AtendimentoRepository;
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
 * REST controller for managing {@link br.com.crmvaleverdeapp.domain.Atendimento}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class AtendimentoResource {

    private final Logger log = LoggerFactory.getLogger(AtendimentoResource.class);

    private static final String ENTITY_NAME = "atendimento";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AtendimentoRepository atendimentoRepository;

    public AtendimentoResource(AtendimentoRepository atendimentoRepository) {
        this.atendimentoRepository = atendimentoRepository;
    }

    /**
     * {@code POST  /atendimentos} : Create a new atendimento.
     *
     * @param atendimento the atendimento to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new atendimento, or with status {@code 400 (Bad Request)} if the atendimento has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/atendimentos")
    public ResponseEntity<Atendimento> createAtendimento(@RequestBody Atendimento atendimento) throws URISyntaxException {
        log.debug("REST request to save Atendimento : {}", atendimento);
        if (atendimento.getId() != null) {
            throw new BadRequestAlertException("A new atendimento cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Atendimento result = atendimentoRepository.save(atendimento);
        return ResponseEntity.created(new URI("/api/atendimentos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /atendimentos} : Updates an existing atendimento.
     *
     * @param atendimento the atendimento to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated atendimento,
     * or with status {@code 400 (Bad Request)} if the atendimento is not valid,
     * or with status {@code 500 (Internal Server Error)} if the atendimento couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/atendimentos")
    public ResponseEntity<Atendimento> updateAtendimento(@RequestBody Atendimento atendimento) throws URISyntaxException {
        log.debug("REST request to update Atendimento : {}", atendimento);
        if (atendimento.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Atendimento result = atendimentoRepository.save(atendimento);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, atendimento.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /atendimentos} : get all the atendimentos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of atendimentos in body.
     */
    @GetMapping("/atendimentos")
    public List<Atendimento> getAllAtendimentos() {
        log.debug("REST request to get all Atendimentos");
        return atendimentoRepository.findAll();
    }

    /**
     * {@code GET  /atendimentos/:id} : get the "id" atendimento.
     *
     * @param id the id of the atendimento to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the atendimento, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/atendimentos/{id}")
    public ResponseEntity<Atendimento> getAtendimento(@PathVariable Long id) {
        log.debug("REST request to get Atendimento : {}", id);
        Optional<Atendimento> atendimento = atendimentoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(atendimento);
    }

    /**
     * {@code DELETE  /atendimentos/:id} : delete the "id" atendimento.
     *
     * @param id the id of the atendimento to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/atendimentos/{id}")
    public ResponseEntity<Void> deleteAtendimento(@PathVariable Long id) {
        log.debug("REST request to delete Atendimento : {}", id);
        atendimentoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}

package br.com.crmvaleverdeapp.web.rest;

import br.com.crmvaleverdeapp.domain.EtapaAtendimento;
import br.com.crmvaleverdeapp.repository.EtapaAtendimentoRepository;
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
 * REST controller for managing {@link br.com.crmvaleverdeapp.domain.EtapaAtendimento}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class EtapaAtendimentoResource {

    private final Logger log = LoggerFactory.getLogger(EtapaAtendimentoResource.class);

    private static final String ENTITY_NAME = "etapaAtendimento";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EtapaAtendimentoRepository etapaAtendimentoRepository;

    public EtapaAtendimentoResource(EtapaAtendimentoRepository etapaAtendimentoRepository) {
        this.etapaAtendimentoRepository = etapaAtendimentoRepository;
    }

    /**
     * {@code POST  /etapa-atendimentos} : Create a new etapaAtendimento.
     *
     * @param etapaAtendimento the etapaAtendimento to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new etapaAtendimento, or with status {@code 400 (Bad Request)} if the etapaAtendimento has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/etapa-atendimentos")
    public ResponseEntity<EtapaAtendimento> createEtapaAtendimento(@RequestBody EtapaAtendimento etapaAtendimento) throws URISyntaxException {
        log.debug("REST request to save EtapaAtendimento : {}", etapaAtendimento);
        if (etapaAtendimento.getId() != null) {
            throw new BadRequestAlertException("A new etapaAtendimento cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EtapaAtendimento result = etapaAtendimentoRepository.save(etapaAtendimento);
        return ResponseEntity.created(new URI("/api/etapa-atendimentos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /etapa-atendimentos} : Updates an existing etapaAtendimento.
     *
     * @param etapaAtendimento the etapaAtendimento to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated etapaAtendimento,
     * or with status {@code 400 (Bad Request)} if the etapaAtendimento is not valid,
     * or with status {@code 500 (Internal Server Error)} if the etapaAtendimento couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/etapa-atendimentos")
    public ResponseEntity<EtapaAtendimento> updateEtapaAtendimento(@RequestBody EtapaAtendimento etapaAtendimento) throws URISyntaxException {
        log.debug("REST request to update EtapaAtendimento : {}", etapaAtendimento);
        if (etapaAtendimento.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        EtapaAtendimento result = etapaAtendimentoRepository.save(etapaAtendimento);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, etapaAtendimento.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /etapa-atendimentos} : get all the etapaAtendimentos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of etapaAtendimentos in body.
     */
    @GetMapping("/etapa-atendimentos")
    public List<EtapaAtendimento> getAllEtapaAtendimentos() {
        log.debug("REST request to get all EtapaAtendimentos");
        return etapaAtendimentoRepository.findAll();
    }

    /**
     * {@code GET  /etapa-atendimentos/:id} : get the "id" etapaAtendimento.
     *
     * @param id the id of the etapaAtendimento to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the etapaAtendimento, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/etapa-atendimentos/{id}")
    public ResponseEntity<EtapaAtendimento> getEtapaAtendimento(@PathVariable Long id) {
        log.debug("REST request to get EtapaAtendimento : {}", id);
        Optional<EtapaAtendimento> etapaAtendimento = etapaAtendimentoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(etapaAtendimento);
    }

    /**
     * {@code DELETE  /etapa-atendimentos/:id} : delete the "id" etapaAtendimento.
     *
     * @param id the id of the etapaAtendimento to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/etapa-atendimentos/{id}")
    public ResponseEntity<Void> deleteEtapaAtendimento(@PathVariable Long id) {
        log.debug("REST request to delete EtapaAtendimento : {}", id);
        etapaAtendimentoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}

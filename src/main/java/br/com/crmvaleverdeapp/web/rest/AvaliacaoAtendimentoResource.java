package br.com.crmvaleverdeapp.web.rest;

import br.com.crmvaleverdeapp.domain.AvaliacaoAtendimento;
import br.com.crmvaleverdeapp.repository.AvaliacaoAtendimentoRepository;
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
 * REST controller for managing {@link br.com.crmvaleverdeapp.domain.AvaliacaoAtendimento}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class AvaliacaoAtendimentoResource {

    private final Logger log = LoggerFactory.getLogger(AvaliacaoAtendimentoResource.class);

    private static final String ENTITY_NAME = "avaliacaoAtendimento";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AvaliacaoAtendimentoRepository avaliacaoAtendimentoRepository;

    public AvaliacaoAtendimentoResource(AvaliacaoAtendimentoRepository avaliacaoAtendimentoRepository) {
        this.avaliacaoAtendimentoRepository = avaliacaoAtendimentoRepository;
    }

    /**
     * {@code POST  /avaliacao-atendimentos} : Create a new avaliacaoAtendimento.
     *
     * @param avaliacaoAtendimento the avaliacaoAtendimento to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new avaliacaoAtendimento, or with status {@code 400 (Bad Request)} if the avaliacaoAtendimento has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/avaliacao-atendimentos")
    public ResponseEntity<AvaliacaoAtendimento> createAvaliacaoAtendimento(@RequestBody AvaliacaoAtendimento avaliacaoAtendimento) throws URISyntaxException {
        log.debug("REST request to save AvaliacaoAtendimento : {}", avaliacaoAtendimento);
        if (avaliacaoAtendimento.getId() != null) {
            throw new BadRequestAlertException("A new avaliacaoAtendimento cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AvaliacaoAtendimento result = avaliacaoAtendimentoRepository.save(avaliacaoAtendimento);
        return ResponseEntity.created(new URI("/api/avaliacao-atendimentos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /avaliacao-atendimentos} : Updates an existing avaliacaoAtendimento.
     *
     * @param avaliacaoAtendimento the avaliacaoAtendimento to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated avaliacaoAtendimento,
     * or with status {@code 400 (Bad Request)} if the avaliacaoAtendimento is not valid,
     * or with status {@code 500 (Internal Server Error)} if the avaliacaoAtendimento couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/avaliacao-atendimentos")
    public ResponseEntity<AvaliacaoAtendimento> updateAvaliacaoAtendimento(@RequestBody AvaliacaoAtendimento avaliacaoAtendimento) throws URISyntaxException {
        log.debug("REST request to update AvaliacaoAtendimento : {}", avaliacaoAtendimento);
        if (avaliacaoAtendimento.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AvaliacaoAtendimento result = avaliacaoAtendimentoRepository.save(avaliacaoAtendimento);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, avaliacaoAtendimento.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /avaliacao-atendimentos} : get all the avaliacaoAtendimentos.
     *
     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of avaliacaoAtendimentos in body.
     */
    @GetMapping("/avaliacao-atendimentos")
    public List<AvaliacaoAtendimento> getAllAvaliacaoAtendimentos(@RequestParam(required = false) String filter) {
        if ("avaliacao-is-null".equals(filter)) {
            log.debug("REST request to get all AvaliacaoAtendimentos where avaliacao is null");
            return StreamSupport
                .stream(avaliacaoAtendimentoRepository.findAll().spliterator(), false)
                .filter(avaliacaoAtendimento -> avaliacaoAtendimento.getAvaliacao() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all AvaliacaoAtendimentos");
        return avaliacaoAtendimentoRepository.findAll();
    }

    /**
     * {@code GET  /avaliacao-atendimentos/:id} : get the "id" avaliacaoAtendimento.
     *
     * @param id the id of the avaliacaoAtendimento to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the avaliacaoAtendimento, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/avaliacao-atendimentos/{id}")
    public ResponseEntity<AvaliacaoAtendimento> getAvaliacaoAtendimento(@PathVariable Long id) {
        log.debug("REST request to get AvaliacaoAtendimento : {}", id);
        Optional<AvaliacaoAtendimento> avaliacaoAtendimento = avaliacaoAtendimentoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(avaliacaoAtendimento);
    }

    /**
     * {@code DELETE  /avaliacao-atendimentos/:id} : delete the "id" avaliacaoAtendimento.
     *
     * @param id the id of the avaliacaoAtendimento to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/avaliacao-atendimentos/{id}")
    public ResponseEntity<Void> deleteAvaliacaoAtendimento(@PathVariable Long id) {
        log.debug("REST request to delete AvaliacaoAtendimento : {}", id);
        avaliacaoAtendimentoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}

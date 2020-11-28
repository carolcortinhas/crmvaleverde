import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDocumento } from 'app/shared/model/documento.model';
import { DocumentoService } from './documento.service';
import { DocumentoDeleteDialogComponent } from './documento-delete-dialog.component';

@Component({
  selector: 'jhi-documento',
  templateUrl: './documento.component.html',
})
export class DocumentoComponent implements OnInit, OnDestroy {
  documentos?: IDocumento[];
  eventSubscriber?: Subscription;

  constructor(protected documentoService: DocumentoService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.documentoService.query().subscribe((res: HttpResponse<IDocumento[]>) => (this.documentos = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInDocumentos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IDocumento): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInDocumentos(): void {
    this.eventSubscriber = this.eventManager.subscribe('documentoListModification', () => this.loadAll());
  }

  delete(documento: IDocumento): void {
    const modalRef = this.modalService.open(DocumentoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.documento = documento;
  }
}

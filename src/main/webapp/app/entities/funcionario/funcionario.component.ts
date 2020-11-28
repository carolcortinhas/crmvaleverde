import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IFuncionario } from 'app/shared/model/funcionario.model';
import { FuncionarioService } from './funcionario.service';
import { FuncionarioDeleteDialogComponent } from './funcionario-delete-dialog.component';

@Component({
  selector: 'jhi-funcionario',
  templateUrl: './funcionario.component.html',
})
export class FuncionarioComponent implements OnInit, OnDestroy {
  funcionarios?: IFuncionario[];
  eventSubscriber?: Subscription;

  constructor(
    protected funcionarioService: FuncionarioService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.funcionarioService.query().subscribe((res: HttpResponse<IFuncionario[]>) => (this.funcionarios = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInFuncionarios();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IFuncionario): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInFuncionarios(): void {
    this.eventSubscriber = this.eventManager.subscribe('funcionarioListModification', () => this.loadAll());
  }

  delete(funcionario: IFuncionario): void {
    const modalRef = this.modalService.open(FuncionarioDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.funcionario = funcionario;
  }
}

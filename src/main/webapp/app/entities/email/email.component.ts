import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IEmail } from 'app/shared/model/email.model';
import { EmailService } from './email.service';
import { EmailDeleteDialogComponent } from './email-delete-dialog.component';

@Component({
  selector: 'jhi-email',
  templateUrl: './email.component.html',
})
export class EmailComponent implements OnInit, OnDestroy {
  emails?: IEmail[];
  eventSubscriber?: Subscription;

  constructor(protected emailService: EmailService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.emailService.query().subscribe((res: HttpResponse<IEmail[]>) => (this.emails = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInEmails();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IEmail): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInEmails(): void {
    this.eventSubscriber = this.eventManager.subscribe('emailListModification', () => this.loadAll());
  }

  delete(email: IEmail): void {
    const modalRef = this.modalService.open(EmailDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.email = email;
  }
}

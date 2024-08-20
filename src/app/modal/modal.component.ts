import { Component, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IconDefinition, faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  loginInfo: string = 'Login to add to favourites!';
  modalRef!: BsModalRef;
  closeIcon: IconDefinition = faXmark;

  constructor(private modalService: BsModalService
  ) {}

  hide() {
    this.modalService.hide();
  }
}

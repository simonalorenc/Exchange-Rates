import { Component, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IconDefinition, faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  loginInfo: string = '';
  modalRef!: BsModalRef;
  closeIcon: IconDefinition = faXmark;

  constructor(private modalService: BsModalService
  ) {}

  ngOnInit() {
    if (this.modalRef.content && this.modalRef.content.loginInfo) {
      this.loginInfo = this.modalRef.content.loginInfo;
    }
  }

  hide() {
    this.modalService.hide();
  }
}

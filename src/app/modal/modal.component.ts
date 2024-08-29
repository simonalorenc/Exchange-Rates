import { Component } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { IconDefinition, faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  message: string = '';
  closeIcon: IconDefinition = faXmark;

  constructor(private modalService: BsModalService
  ) {}

  public hide() {
    this.modalService.hide();
  }
}

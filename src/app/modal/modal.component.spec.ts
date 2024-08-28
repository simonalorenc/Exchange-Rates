import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalComponent } from './modal.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let bsModalServiceSpy = jasmine.createSpyObj('BsModalService', ['show', 'hide']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalComponent],
      providers: [
        { provide: BsModalService, useValue: bsModalServiceSpy },
      ], 
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
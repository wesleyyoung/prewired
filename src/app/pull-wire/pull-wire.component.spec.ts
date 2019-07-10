import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PullWireComponent } from './pull-wire.component';

describe('PullWireComponent', () => {
  let component: PullWireComponent;
  let fixture: ComponentFixture<PullWireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PullWireComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PullWireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

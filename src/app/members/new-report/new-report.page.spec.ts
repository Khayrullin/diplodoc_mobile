import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewReportPage } from './new-report.page';

describe('NewReportPage', () => {
  let component: NewReportPage;
  let fixture: ComponentFixture<NewReportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewReportPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

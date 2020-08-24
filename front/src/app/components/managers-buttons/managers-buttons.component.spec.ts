import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagersButtonsComponent } from './managers-buttons.component';

describe('ManagersButtonsComponent', () => {
  let component: ManagersButtonsComponent;
  let fixture: ComponentFixture<ManagersButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagersButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagersButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

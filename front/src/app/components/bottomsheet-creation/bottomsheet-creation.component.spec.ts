import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomsheetCreationComponent } from './bottomsheet-creation.component';

describe('BottomsheetCreationComponent', () => {
  let component: BottomsheetCreationComponent;
  let fixture: ComponentFixture<BottomsheetCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BottomsheetCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomsheetCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

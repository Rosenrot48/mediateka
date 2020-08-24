import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsefulNavbarComponent } from './useful-navbar.component';

describe('UsefulNavbarComponent', () => {
  let component: UsefulNavbarComponent;
  let fixture: ComponentFixture<UsefulNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsefulNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsefulNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

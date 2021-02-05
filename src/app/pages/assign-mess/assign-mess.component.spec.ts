import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignMessComponent } from './assign-mess.component';

describe('AssignMessComponent', () => {
  let component: AssignMessComponent;
  let fixture: ComponentFixture<AssignMessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignMessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignMessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDueComponent } from './add-due.component';

describe('AddDueComponent', () => {
  let component: AddDueComponent;
  let fixture: ComponentFixture<AddDueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

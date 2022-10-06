import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectGradosComponent } from './select-grados.component';

describe('SelectGradosComponent', () => {
  let component: SelectGradosComponent;
  let fixture: ComponentFixture<SelectGradosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectGradosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectGradosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

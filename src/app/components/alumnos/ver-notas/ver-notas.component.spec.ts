import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerNotasComponent } from './ver-notas.component';

describe('VerNotasComponent', () => {
  let component: VerNotasComponent;
  let fixture: ComponentFixture<VerNotasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerNotasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerNotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

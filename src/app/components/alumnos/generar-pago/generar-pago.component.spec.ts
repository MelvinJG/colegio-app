import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarPagoComponent } from './generar-pago.component';

describe('GenerarPagoComponent', () => {
  let component: GenerarPagoComponent;
  let fixture: ComponentFixture<GenerarPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerarPagoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

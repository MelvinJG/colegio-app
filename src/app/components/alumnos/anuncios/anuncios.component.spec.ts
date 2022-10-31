import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnunciosTareasComponent } from './anuncios.component';

describe('AnunciosTareasComponent', () => {
  let component: AnunciosTareasComponent;
  let fixture: ComponentFixture<AnunciosTareasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnunciosTareasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnunciosTareasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

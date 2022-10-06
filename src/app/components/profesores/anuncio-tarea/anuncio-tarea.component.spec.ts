import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnuncioTareaComponent } from './anuncio-tarea.component';

describe('AnuncioTareaComponent', () => {
  let component: AnuncioTareaComponent;
  let fixture: ComponentFixture<AnuncioTareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnuncioTareaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnuncioTareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

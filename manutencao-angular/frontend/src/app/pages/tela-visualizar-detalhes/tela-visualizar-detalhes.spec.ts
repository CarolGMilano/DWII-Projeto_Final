import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaVisualizarDetalhes } from './tela-visualizar-detalhes';

describe('TelaVisualizarDetalhes', () => {
  let component: TelaVisualizarDetalhes;
  let fixture: ComponentFixture<TelaVisualizarDetalhes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelaVisualizarDetalhes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelaVisualizarDetalhes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

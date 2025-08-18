import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarOrcamento } from './visualizar-orcamento';

describe('VisualizarOrcamento', () => {
  let component: VisualizarOrcamento;
  let fixture: ComponentFixture<VisualizarOrcamento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualizarOrcamento]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizarOrcamento);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

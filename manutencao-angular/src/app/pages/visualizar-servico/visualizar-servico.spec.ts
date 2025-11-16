import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarServico } from './visualizar-servico';

describe('VisualizarServico', () => {
  let component: VisualizarServico;
  let fixture: ComponentFixture<VisualizarServico>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualizarServico]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizarServico);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaListaSolicitacoes } from './tela-lista-solicitacoes';

describe('TelaListaSolicitacoes', () => {
  let component: TelaListaSolicitacoes;
  let fixture: ComponentFixture<TelaListaSolicitacoes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelaListaSolicitacoes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelaListaSolicitacoes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

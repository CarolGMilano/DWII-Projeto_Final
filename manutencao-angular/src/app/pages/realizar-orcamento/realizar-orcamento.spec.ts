import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealizarOrcamento } from './realizar-orcamento';

describe('RealizarOrcamento', () => {
  let component: RealizarOrcamento;
  let fixture: ComponentFixture<RealizarOrcamento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RealizarOrcamento]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RealizarOrcamento);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

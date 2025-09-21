import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoltarTela } from './voltar-tela';

describe('VoltarTela', () => {
  let component: VoltarTela;
  let fixture: ComponentFixture<VoltarTela>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoltarTela]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoltarTela);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

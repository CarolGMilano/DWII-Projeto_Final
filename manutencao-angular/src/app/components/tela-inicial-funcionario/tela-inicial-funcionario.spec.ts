import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaInicialFuncionario } from './tela-inicial-funcionario';

describe('TelaInicialFuncionario', () => {
  let component: TelaInicialFuncionario;
  let fixture: ComponentFixture<TelaInicialFuncionario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelaInicialFuncionario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelaInicialFuncionario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

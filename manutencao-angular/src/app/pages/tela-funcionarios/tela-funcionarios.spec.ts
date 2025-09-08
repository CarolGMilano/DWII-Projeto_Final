import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaFuncionarios } from './tela-funcionarios';

describe('TelaFuncionarios', () => {
  let component: TelaFuncionarios;
  let fixture: ComponentFixture<TelaFuncionarios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelaFuncionarios]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelaFuncionarios);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

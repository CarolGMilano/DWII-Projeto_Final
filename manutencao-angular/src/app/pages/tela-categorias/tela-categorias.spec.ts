import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaCategorias } from './tela-categorias';

describe('TelaCategorias', () => {
  let component: TelaCategorias;
  let fixture: ComponentFixture<TelaCategorias>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelaCategorias]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelaCategorias);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagarServico } from './pagar-servico';

describe('PagarServico', () => {
  let component: PagarServico;
  let fixture: ComponentFixture<PagarServico>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagarServico]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagarServico);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

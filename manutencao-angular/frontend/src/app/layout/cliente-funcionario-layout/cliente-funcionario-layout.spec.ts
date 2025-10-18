import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteFuncionarioLayout } from './cliente-funcionario-layout';

describe('ClienteFuncionarioLayout', () => {
  let component: ClienteFuncionarioLayout;
  let fixture: ComponentFixture<ClienteFuncionarioLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClienteFuncionarioLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteFuncionarioLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { Solicitacao } from './solicitacao.service';

describe('Solicitacao', () => {
  let service: Solicitacao;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Solicitacao);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

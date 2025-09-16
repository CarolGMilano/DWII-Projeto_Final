import { TestBed } from '@angular/core/testing';

import { SolicitacaoFakeService } from './solicitacao-fake';

describe('SolicitacaoFakeService', () => {
  let service: SolicitacaoFakeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitacaoFakeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

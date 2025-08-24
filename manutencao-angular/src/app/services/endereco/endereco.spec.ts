import { TestBed } from '@angular/core/testing';

import { EnderecoService } from './endereco.service';

describe('Endereco', () => {
  let service: EnderecoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnderecoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

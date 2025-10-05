import { CepValidator } from './cep-validator';

describe('CepValidator', () => {
  it('should create an instance', () => {
    const directive = new CepValidator();
    expect(directive).toBeTruthy();
  });
});

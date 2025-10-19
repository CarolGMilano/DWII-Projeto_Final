import { CpfValidator } from './cpf-validator';

describe('CpfValidator', () => {
  it('should create an instance', () => {
    const directive = new CpfValidator();
    expect(directive).toBeTruthy();
  });
});

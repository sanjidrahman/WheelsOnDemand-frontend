import { PriceCalculationPipe } from './price-calculation.pipe';

describe('PriceCalculationPipe', () => {
  it('create an instance', () => {
    const pipe = new PriceCalculationPipe();
    expect(pipe).toBeTruthy();
  });
});

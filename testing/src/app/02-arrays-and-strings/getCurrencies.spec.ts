/**
 * Created by russell.frame on 7/24/2017.
 */
import {getCurrencies} from './getCurrencies';

describe('getCurrencies', () => {
  it('should return supported currencies', () => {
    const result = getCurrencies();
    expect(result).toContain('USD');
    expect(result).toContain('AUD');
    expect(result).toContain('EUR');
  });
});

import {compute} from './compute';
/**
 * Created by russell.frame on 7/24/2017.
 */

// describe() // suite
// it() // spec
describe('compute', () => {
  it('Should Return 0 if input is negative', () => {
    const result = compute(-1);
    expect(result).toBe(0);
  });
  it('Should increment the number if greater then 0', () => {
    let num: number = 10;
    const result = compute(num);
    expect(result).toBe(++num);
  })
});

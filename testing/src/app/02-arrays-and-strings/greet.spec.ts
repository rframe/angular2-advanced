import {greet} from './greet';
/**
 * Created by russell.frame on 7/24/2017.
 */
// describe('', () => {
//   it('', () => {
//     expect().toBe();
//   });
// });
describe('greet', () => {
  it('should include the name in the output', () => {
    expect(greet('mosh')).toContain('mosh');
  });
});

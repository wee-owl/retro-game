import { calcTileType } from '../utils';

test('check calcTileType func', () => {
  expect(calcTileType(0, 8)).toBe('top-left');
  expect(calcTileType(4, 8)).toBe('top');
  expect(calcTileType(7, 8)).toBe('top-right');
  expect(calcTileType(24, 8)).toBe('left');
  expect(calcTileType(28, 8)).toBe('center');
  expect(calcTileType(31, 8)).toBe('right');
  expect(calcTileType(56, 8)).toBe('bottom-left');
  expect(calcTileType(60, 8)).toBe('bottom');
  expect(calcTileType(63, 8)).toBe('bottom-right');
  expect(() => calcTileType(64, 8)).toThrow();
});

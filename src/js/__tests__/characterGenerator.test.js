import Bowman from '../characters/Bowman';
import Magician from '../characters/Magician';
import Swordsman from '../characters/Swordsman';
import { characterGenerator } from '../generators';

test('check the generator result for valid value', () => {
  const allowedTypes = [Bowman, Swordsman, Magician];
  const allowedTypesNames = allowedTypes.map(((item) => item.name));
  const playerGenerator = characterGenerator(allowedTypes, 4);
  // тип результирующего объекта содержится в массиве имен классов
  expect(allowedTypesNames.includes(playerGenerator.next().value.type)).toBeTruthy();
});

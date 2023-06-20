import Swordsman from '../characters/Swordsman';
import Magician from '../characters/Magician';
import Bowman from '../characters/Bowman';
import { generateTeam } from '../generators';

test('check generateTeam to invalid input value', () => {
  const allowedTypes = { Bowman };
  expect(() => generateTeam(allowedTypes, 4, 3)).toThrow();
});

test('check generateTeam for character creation', () => {
  const allowedTypes = [Bowman, Swordsman, Magician];
  const maxLevel = 4;
  const characterCount = 3;
  const team = generateTeam(allowedTypes, maxLevel, characterCount);
  expect(team.characters.length).toBe(characterCount);
  expect(team.characters.every((item) => item.level <= maxLevel)).toBeTruthy();
});

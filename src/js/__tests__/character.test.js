import Character from '../Character';
import Bowman from '../characters/Bowman';
import Daemon from '../characters/Daemon';
import Undead from '../characters/Undead';
import Vampire from '../characters/Vampire';
import Magician from '../characters/Magician';
import Swordsman from '../characters/Swordsman';

test('check to error while creating object of class Character', () => {
  expect(() => new Character(1, 'Bowman')).toThrow();
});

test('checking for the creation of objects of inherited classes', () => {
  const swordsman = new Swordsman(1);
  const magician = new Magician(1);
  const vampire = new Vampire(1);
  const bowman = new Bowman(1);
  const undead = new Undead(1);
  const daemon = new Daemon(1);

  expect(swordsman).toEqual({
    level: 1, attack: 40, defence: 10, health: 50, type: 'Swordsman',
  });
  expect(magician).toEqual({
    level: 1, attack: 10, defence: 40, health: 50, type: 'Magician',
  });
  expect(vampire).toEqual({
    level: 1, attack: 25, defence: 25, health: 50, type: 'Vampire',
  });
  expect(bowman).toEqual({
    level: 1, attack: 25, defence: 25, health: 50, type: 'Bowman',
  });
  expect(undead).toEqual({
    level: 1, attack: 40, defence: 10, health: 50, type: 'Undead',
  });
  expect(daemon).toEqual({
    level: 1, attack: 10, defence: 10, health: 50, type: 'Daemon',
  });
});

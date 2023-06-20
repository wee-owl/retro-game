/**
 * Формирует экземпляр персонажа из массива allowedTypes со
 * случайным уровнем от 1 до maxLevel
 *
 * @param allowedTypes массив классов
 * @param maxLevel максимальный возможный уровень персонажа
 * @returns генератор, который при каждом вызове
 * возвращает новый экземпляр класса персонажа
 *
 */
import Team from './Team';

export function* characterGenerator(allowedTypes, maxLevel) {
  function randomInteger(min, max) {
    const num = min + Math.random() * (max + 1 - min);
    return Math.floor(num);
  }
  let index;
  let lvl;

  while (true) {
    index = randomInteger(0, allowedTypes.length);
    lvl = randomInteger(1, maxLevel);
    yield new allowedTypes[index](lvl);
  }
}

/**
 * Формирует массив персонажей на основе characterGenerator
 * @param allowedTypes массив классов
 * @param maxLevel максимальный возможный уровень персонажа
 * @param characterCount количество персонажей, которое нужно сформировать
 * @returns экземпляр Team, хранящий экземпляры персонажей.
 * Количество персонажей в команде - characterCount
 * */
export function generateTeam(allowedTypes, maxLevel, characterCount) {
  if (!Array.isArray(allowedTypes)) {
    throw new Error('Available player classes must be passed as an array');
  }

  const playersArray = [];

  for (let i = 1; i <= characterCount; i += 1) {
    const generateCharacter = characterGenerator(allowedTypes, maxLevel);
    const newCharacter = generateCharacter.next().value;
    playersArray.push(newCharacter);
  }

  return new Team(playersArray);
}

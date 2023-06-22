import GameController from '../GameController';

test('check tooltip', () => {
  const tooltip = `\u{1F396}${1}\u{2694}${25}\u{1F6E1}${25}\u{2764}${50}`;
  const bowman = {
    level: 1,
    attack: 25,
    defence: 25,
    health: 50,
  };
  expect(GameController.showTooltip(bowman)).toEqual(tooltip);
});

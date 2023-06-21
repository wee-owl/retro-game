/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import PositionedCharacter from './PositionedCharacter';
import Swordsman from './characters/Swordsman';
import Magician from './characters/Magician';
import { generateTeam } from './generators';
import Vampire from './characters/Vampire';
import Bowman from './characters/Bowman';
import Daemon from './characters/Daemon';
import Undead from './characters/Undead';
import themes from './themes';

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
  }

  init() {
    this.renderField(1);

    const playerChar = [Bowman, Swordsman, Magician];
    const enemyChar = [Daemon, Undead, Vampire];

    const playerTeam = this.getPositionedCharacter(this.renderTeam(playerChar), this.renderPosition('player'));
    const enemyTeam = this.getPositionedCharacter(this.renderTeam(enemyChar), this.renderPosition('enemy'));
    this.gamePlay.redrawPositions(playerTeam.concat(enemyTeam));

    // add event listeners to gamePlay events
    // load saved stated from stateService
  }

  renderField(level) {
    let area;
    if (level === 1) area = themes.lvl1;
    if (level === 2) area = themes.lvl2;
    if (level === 3) area = themes.lvl3;
    if (level === 4) area = themes.lvl4;
    return this.gamePlay.drawUi(area);
  }

  renderTeam(array) {
    const maxLevel = 4;
    const characterCount = 3;
    const team = generateTeam(array, maxLevel, characterCount);
    return team.characters;
  }

  renderPosition(typeTeam) {
    const boardSize = 8;
    let positionArray = [];
    positionArray.length = 3;

    // array for players character (column 1-2)
    const playerPositionArray = [...Array(boardSize ** 2)].map((_, i) => i)
      .filter((i) => i % boardSize === 0 || (i - 1) % boardSize === 0);

    // array for players character (column 7-8)
    const enemyPositionArray = [...Array(boardSize ** 2)].map((_, i) => i)
      .filter((i) => (i + 1) % boardSize === 0 || (i + 2) % boardSize === 0);

    // render random index from array
    function renderIndex(array) {
      return Math.floor(Math.random() * (array.length - 1));
    }

    // check array for unique el
    function renderArray(array) {
      const set = new Set(array);
      return set.size === positionArray.length;
    }

    function renderPositionArray(array) {
      while (!renderArray(positionArray)) {
        positionArray = [
          array[renderIndex(array)],
          array[renderIndex(array)],
          array[renderIndex(array)],
        ];
      }
      return positionArray;
    }

    return typeTeam === 'player'
      ? renderPositionArray(playerPositionArray)
      : renderPositionArray(enemyPositionArray);
  }

  getPositionedCharacter(team, positionArray) {
    const completeTeam = [];
    for (let i = 0; i < team.length; i += 1) {
      completeTeam.push(new PositionedCharacter(team[i], positionArray[i]));
    }
    return completeTeam;
  }

  onCellClick(index) {
    // react to click
  }

  onCellEnter(index) {
    // react to mouse enter
  }

  onCellLeave(index) {
    // react to mouse leave
  }
}

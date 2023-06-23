import PositionedCharacter from './PositionedCharacter';
import Swordsman from './characters/Swordsman';
import Magician from './characters/Magician';
import { generateTeam } from './generators';
import Vampire from './characters/Vampire';
import Bowman from './characters/Bowman';
import Daemon from './characters/Daemon';
import Undead from './characters/Undead';
import themes from './themes';
import GamePlay from './GamePlay';

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.boardSize = 8;
    this.maxLevel = 4;
    this.characterCount = 3;
    this.playerChar = [Bowman, Swordsman, Magician];
    this.enemyChar = [Daemon, Undead, Vampire];
    this.playerTeam = this.getPositionedCharacter(this.renderTeam(this.playerChar), this.renderPosition('player'));
    this.enemyTeam = this.getPositionedCharacter(this.renderTeam(this.enemyChar), this.renderPosition('enemy'));
  }

  init() {
    this.renderField(1);

    this.gamePlay.redrawPositions(this.playerTeam.concat(this.enemyTeam));

    // add event listeners to gamePlay events
    this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this));
    this.gamePlay.addCellLeaveListener(this.onCellLeave.bind(this));
    this.gamePlay.addCellClickListener(this.onCellClick.bind(this));

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
    const team = generateTeam(array, this.maxLevel, this.characterCount);
    return team.characters;
  }

  renderPosition(typeTeam) {
    let positionArray = [];
    positionArray.length = 3;

    // array for players character (column 1-2)
    const playerPositionArray = [...Array(this.boardSize ** 2)].map((_, i) => i)
      .filter((i) => i % this.boardSize === 0 || (i - 1) % this.boardSize === 0);

    // array for enemy character (column 7-8)
    const enemyPositionArray = [...Array(this.boardSize ** 2)].map((_, i) => i)
      .filter((i) => (i + 1) % this.boardSize === 0 || (i + 2) % this.boardSize === 0);

    // render array from unique el
    function renderPositionArray(array) {
      while ((new Set(positionArray)).size !== positionArray.length) {
        positionArray = [
          array[Math.floor(Math.random() * (array.length - 1))],
          array[Math.floor(Math.random() * (array.length - 1))],
          array[Math.floor(Math.random() * (array.length - 1))],
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
    for (let i = 0; i < this.characterCount; i += 1) {
      completeTeam.push(new PositionedCharacter(team[i], positionArray[i]));
    }
    return completeTeam;
  }

  onCellClick(index) {
    const boardArray = [...document.querySelector('.board').children];

    if (boardArray[index].children[0]
      && this.playerChar.some((item) => item.name.toLowerCase()
      === boardArray[index].children[0].classList[1])) {
      if (!document.querySelector('.selected-yellow')) {
        this.gamePlay.selectCell(index);
      } else {
        const pick = document.querySelectorAll('.selected-yellow');
        [...pick].map((item) => item.classList.remove('selected-yellow'));
        this.gamePlay.selectCell(index);
      }
    }

    if (boardArray[index].children[0]
      && this.enemyChar.some((item) => item.name.toLowerCase()
      === boardArray[index].children[0].classList[1])) {
      const message = 'Unavailable for next turn';
      if (!document.querySelector('.message')) {
        GamePlay.getMessage(message);
      }
    }
  }

  onCellEnter(index) {
    const boardArray = [...document.querySelector('.board').children];
    const charsArray = this.playerTeam.concat(this.enemyTeam);

    if (boardArray[index].children[0]) {
      const char = charsArray.filter((i) => i.position === index)[0].character;
      const message = GameController.showTooltip(char);
      this.gamePlay.showCellTooltip(message, index);
    }
  }

  static showTooltip(char) {
    return `\u{1F396}${char.level}\u{2694}${char.attack}\u{1F6E1}${char.defence}\u{2764}${char.health}`;
  }

  onCellLeave(index) {
    const boardArray = [...document.querySelector('.board').children];
    if (boardArray[index].children[0]) this.gamePlay.hideCellTooltip(index);
  }
}

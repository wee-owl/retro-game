/**
 * @todo
 * @param index - индекс поля
 * @param boardSize - размер квадратного поля (в длину или ширину)
 * @returns строка - тип ячейки на поле:
 *
 * top-left
 * top-right
 * top
 * bottom-left
 * bottom-right
 * bottom
 * right
 * left
 * center
 *
 * @example
 * ```js
 * calcTileType(0, 8); // 'top-left'
 * calcTileType(1, 8); // 'top'
 * calcTileType(63, 8); // 'bottom-right'
 * calcTileType(7, 7); // 'left'
 * ```
 * */
export function calcTileType(index, boardSize) {
  let area;
  const el = boardSize ** 2 - boardSize;
  if (index >= boardSize ** 2) throw new Error('Invalid cell index value');
  if (index === 0) {
    area = 'top-left';
  } else if (index === boardSize - 1) {
    area = 'top-right';
  } else if (index === boardSize ** 2 - 1) {
    area = 'bottom-right';
  } else if (index === el) {
    area = 'bottom-left';
  } else if (index > 0 && index < boardSize) {
    area = 'top';
  } else if (index > el && index < boardSize ** 2 - 1) {
    area = 'bottom';
  } else if (index > 0 && index < el && index % boardSize === 0) {
    area = 'left';
  } else if (index > boardSize - 1 && index < el && (index + 1) % boardSize === 0) {
    area = 'right';
  } else {
    area = 'center';
  }
  return area;
}

export function calcHealthLevel(health) {
  if (health < 15) {
    return 'critical';
  }

  if (health < 50) {
    return 'normal';
  }

  return 'high';
}

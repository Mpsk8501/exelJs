const CODES = {
  A: 65,
  Z: 90
}

function createCell() {
  return `<div contenteditable="true" class="cell"></div>`
}

function createColumn(char='') {
  return `<div class="column">${char}</div>`
}

function createRow(content, num = '') {
  return `<div class="row">
        <div class="row__info">${num}</div>
        <div class="row__data">${content}</div>
    </div>`
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A +index)
}

export function createTable(rowsCount = 20) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []
  const firstRow = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(createColumn)
      .join('')

  rows.push(createRow(firstRow))

  const row = new Array(colsCount)
      .fill(createCell())
      .join('')

  for (let i =1; i<=rowsCount; i++) {
    rows.push(createRow(row, i))
  }

  /* const firstColumn = []
  const rowCells = []
  for (let i = CODES.A; i<=CODES.Z; i++) {
    const char = String.fromCharCode(i)
    firstColumn.push(createColumn(char))
    rowCells.push(createCell())
  }
  rows.push(createRow(firstColumn.join('')))
  for (let i =1; i<=rowsCount; i++) {
    rows.push(createRow(rowCells.join(''), i))
  }*/

  return rows.join('')
}

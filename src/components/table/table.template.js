const CODES = {
  A: 65,
  Z: 90
}

function createCell(row) {
  return function(_, col) {
    return `<div 
        data-type="cell"
        data-col=${col+1} 
        data-id=${row}:${col+1}
        contenteditable="true" 
        class="cell"></div>`
  }
}

function createColumn(char='', index) {
  return `<div data-type="resizable" data-col=${index+1} class="column">
            ${char}
            <div data-resize="col" class="col-resize"></div>
        </div>`
}

function createRow(content, num = '') {
  const resize = num ? `<div data-resize="row"  class="row-resize"></div>` : num
  return `<div data-row=${num} data-type="resizable"  class="row">
        <div  data-row-info class="row__info">
            ${num}${resize}
        </div>
        <div data-row-data class="row__data">${content}</div>
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

  for (let i =1; i<=rowsCount; i++) {
    const row = new Array(colsCount)
        .fill('')
        .map(createCell(i))
        .join('')
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

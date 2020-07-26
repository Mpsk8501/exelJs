import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template'
import {resizeHandler} from '@/components/table/table.resize'
import {shouldResize, isCell, matrix, nextSelector}
  from '@/components/table/table.functions'
import {TableSelection} from '@/components/table/TableSelection'
import {$} from '@core/dom'

export class Table extends ExcelComponent {
  static className = 'table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    })
  }

  toHTML() {
    return createTable(50)
  }

  prepare() {
    this.selection = new TableSelection()
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)
  }

  init() {
    super.init()
    const $cell = this.$root.find('[data-id="1:1"]')
    this.selectCell($cell)
    this.$on('formula:input', text => {
      this.selection.current.text(text)
    })
    this.$on('formula:done', () => {
      this.selection.current.focus()
    })
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(event, this.$root)
    } else if (isCell(event)) {
      const $cell = $(event.target)
      if (event.shiftKey) {
        const group = matrix($cell, this.selection.current)
            .map(id => this.$root.find(`[data-id="${id}"]`))
        this.selection.selectGroup(group)
      } else {
        this.selection.select($cell)
      }
    }
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab',
      'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown']
    const {key} = event
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault()
      const id = this.selection.current.id(true)
      const $next = this.$root.find(nextSelector(key, id))
      this.selectCell($next)
    }
  }

  onInput(e) {
    this.$emit('table:input', $(e.target))
  }
}


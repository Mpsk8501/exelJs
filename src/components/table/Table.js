import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template'
import {resizer} from '@/components/table/resizer'

export class Table extends ExcelComponent {
  static className = 'table'

  constructor($root) {
    super($root, {
      listeners: ['mousedown']
    })
  }

  toHTML() {
    return createTable(18)
  }

  onClick() {
    console.log('click')
  }

  onMousedown(event) {
    resizer(event, this.$root)
  }
}

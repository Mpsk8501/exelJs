import {ExcelComponent} from '@core/ExcelComponent'

export class Formula extends ExcelComponent {
  static className = 'formula'

  constructor($root) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click', 'dblclick']
    })
  }


  toHTML() {
    return `
     <div class="formula__info">fx</div>
     <div spellcheck="false" contenteditable class="formula__input"></div>
    `
  }

  onInput() {
    console.log(`Formula: onInput`, event.target.textContent.trim())
  }

  onClick() {
    console.log(`Formula: click`)
  }

  onDblclick() {
    console.log(`Formula: Dblclick`)
    this.destroy()
  }
}

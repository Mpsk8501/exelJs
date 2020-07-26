import {ExcelComponent} from '@core/ExcelComponent'

export class Header extends ExcelComponent {
  static className = 'header'
  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: [],
      ...options
    })
  }

  toHTML() {
    return `
    <input type="text" value="New table" class="header__input input">
            <div class="header__btnBlock">
                <div class="header__button">
                        <span class="material-icons">
                            delete
                        </span>
                </div>
                <div class="header__button">
                    <a style="color: inherit" href="dashboard.html">
                        <span class="material-icons">
                            exit_to_app
                        </span>
                    </a>
                </div>
            </div>
    `
  }
}

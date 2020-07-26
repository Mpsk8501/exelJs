export class TableSelection {
  static className = 'selected'
  constructor() {
    this.group = []
    this.current = null
  }

  select($el) {
    this.unSelect()
    this.group.push($el)
    this.current = $el
    $el.focus().addClass(TableSelection.className)
  }

  selectGroup($group = []) {
    this.unSelect()
    this.group = $group
    this.group.forEach($el =>
      $el.addClass(TableSelection.className)
    )
    this.group[0].focus()
  }

  unSelect() {
    this.group.forEach($el =>
      $el.removeClass(TableSelection.className)
    )
    this.group = []
  }
}

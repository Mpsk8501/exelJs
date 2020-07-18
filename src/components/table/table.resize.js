import {$} from '@core/dom'

export function resizeHandler(event, root) {
  const resize = event.target.dataset.resize
  const sideProp = resize === 'col' ? 'bottom' : 'right'
  const $resizer = $(event.target)
  $resizer.css({
    opacity: 1,
    [sideProp]: '-5000px'
  })
  const $parent = $resizer.closest('[data-type="resizable"]')
  const coords = $parent.getCoords()
  const elArrCol = resize === 'col' ?
      root.findAll(`[data-col="${$parent.data.col}"`)
      : null
  let delta = 0
  let value = 0

  document.onmousemove = e => {
    if (resize === 'col') {
      delta = e.pageX - coords.right
      value = coords.width + delta
      $resizer.css({
        right: `${-delta}px`
      })
    } else if (resize === 'row') {
      delta = e.pageY - coords.bottom
      value = coords.height + delta
      $resizer.css({
        bottom: `${-delta}px`
      })
    }
  }
  document.onmouseup = () => {
    $resizer.css({
      opacity: 0,
    })
    if (resize === 'col') {
      elArrCol.forEach(cell => {
        $(cell).css({width: `${value}px`})
      })
      $resizer.css({
        right: 0,
        bottom: 0
      })
    } else if (resize === 'row') {
      $parent.css({height: `${value}px`})
      $resizer.css({
        right: 0,
        bottom: 0
      })
    }
    document.onmousemove = null
    document.onmouseup = null
  }
}

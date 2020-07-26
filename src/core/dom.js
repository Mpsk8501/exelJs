class Dom {
  constructor(selector) {
    this.nativeEl = typeof selector === 'string'
        ? document.querySelector(selector)
        : selector
  }

  html(html) {
    if (typeof html === 'string') {
      this.nativeEl.innerHTML = html
      return this
    }
    return this.nativeEl.outerHTML.trim()
  }

  text(text) {
    if (typeof text === 'string') {
      this.nativeEl.textContent = text
      return this
    }
    if (this.nativeEl.tagName.toLowerCase() === 'input') {
      return this.nativeEl.value.trim()
    }
    return this.nativeEl.textContent.trim()
  }

  clear() {
    this.html('')
    return this
  }

  on(eventType, callback) {
    console.log(eventType)
    this.nativeEl.addEventListener(eventType, callback)
  }

  off(eventType, callback) {
    this.nativeEl.removeEventListener(eventType, callback)
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.nativeEl
    }
    if (Element.prototype.append) {
      this.nativeEl.append(node)
    } else {
      this.nativeEl.appendChild(node)
    }

    return this
  }

  get data() {
    return this.nativeEl.dataset
  }

  closest(selector) {
    return $(this.nativeEl.closest(selector))
  }

  find(selector) {
    return $(this.nativeEl.querySelector(selector))
  }

  findAll(selector) {
    return this.nativeEl.querySelectorAll(selector)
  }

  getCoords() {
    return this.nativeEl.getBoundingClientRect()
  }

  css(styles = {}) {
    Object.keys(styles).forEach(style => {
      this.nativeEl.style[style] = styles[style]
    })
  }

  addClass(className) {
    this.nativeEl.classList.add(className)
    return this
  }

  removeClass(className) {
    this.nativeEl.classList.remove(className)
    return this
  }
  id(parse) {
    if (parse) {
      const parsed = this.id().split(':')
      return {
        row: +parsed[0],
        col: +parsed[1]
      }
    }
    return this.data.id
  }

  focus() {
    this.nativeEl.focus()
    return this
  }
}

export function $(selector) {
  return new Dom(selector)
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName)
  if (classes) {
    el.classList.add(classes)
  }
  return $(el)
}

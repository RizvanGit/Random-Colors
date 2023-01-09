const cols = document.querySelectorAll('.col')

document.addEventListener('keydown', event => {
  event.preventDefault()
  if (event.code.toLocaleLowerCase() === 'space') {
    setRandomColors(cols)
  }
})

document.addEventListener('click', event => {
  const type = event.target.dataset.type
  const parentType = event.target.parentNode.dataset.type
  if (type === 'lock' || parentType === 'lock') {
    const node = event.target.tagName.toLowerCase() == 'i'
      ? event.target
      : event.target.firstElementChild
    node.classList.toggle('fa-lock-open')
    node.classList.toggle('fa-lock')
  } else if (type === 'copy') {
    copyColor(event.target)
  }
})

function colorGenerator() {
  //#00FF00
  const hexCodes = '01234567890ABCDEF'
  let color = ''
  for (let i = 0; i < 6; i++) {
    color += hexCodes[Math.trunc(Math.random() * hexCodes.length)]
  }

  return "#" + color
}

function setRandomColors(node, isInitial) {
  const colors = isInitial ? getColorsFromHash() : []

  node.forEach((col, index) => {
    const isLocked = col.querySelector('i').classList.contains('fa-lock')
    const header = col.querySelector('h2')
    

    if (isLocked) {
      colors.push(header.textContent)
      return;
    };

    const color = isInitial ? colors[index] ? colors[index] : colorGenerator() : colorGenerator()

    if (!isInitial) {
      colors.push(color)
    }

    header.textContent = color
    col.style.background = color
  })

  updateColorsHash(colors)
}

function copyColor(node) {
  navigator.clipboard.writeText(node.textContent)
  let text = node.textContent
  node.textContent = 'COPIED!'
  setTimeout(() => {
    node.textContent = text
  }, 1000);
}

function updateColorsHash(colors = []) {
  document.location.hash = colors.map(hash => hash.substring(1)).join('-')
}

function getColorsFromHash() {
  if (document.location.hash.length > 1){
    return document.location.hash.substring(1).split('-').map(hash => '#' + hash)
  }
  return []
}

setRandomColors(cols, true)
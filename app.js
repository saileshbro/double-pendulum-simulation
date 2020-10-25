const form = document.querySelector('form.controls')
form.addEventListener('input', handleInput)
function handleInput(e) {
  e.preventDefault()
  const parent = e.target.parentElement
  if (e.target.id == 'damping') {
    parent.querySelector('output').value =
      (+e.target.value * 100).toFixed(4) + '%'
  } else {
    parent.querySelector('output').value = e.target.value
  }
}

const form = document.querySelector('form.controls')
form.addEventListener('input', handleInput)
function handleInput(e) {
  e.preventDefault()
  const parent = e.target.parentElement
  parent.querySelector('output').value = e.target.value
}

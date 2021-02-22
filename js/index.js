window.onload = init

document.addEventListener('keydown', function (event) {
    const key = event.key.toLowerCase()
    if (key == 'enter') { nextColor(); return }
    if (key == '?') { surrender(); return }
    if (!keyboardLetters.includes(key)) return
    handleGuess(key)
})

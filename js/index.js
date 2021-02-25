window.onload = app.init

document.addEventListener('keydown', function (event) {
    const key = event.key.toLowerCase()
    if (key == 'enter') { app.nextColor(); return }
    if (key == '?') { app.surrender(); return }
    if (!app.keyboardLetters.includes(key)) return
    app.handleGuess(key)
})

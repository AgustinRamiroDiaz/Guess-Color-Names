function init() {
    generateButtons()
    nextColor()
}

function generateButtons() {
    keyboardLetters = 'abcdefghijklmnopqrstuvwxyz'
    let buttonsHTML = keyboardLetters.split('').map(letter =>
        `
            <button
              class="btn btn-lg m-1"
              style="color: #ffffff"
              id='` + letter + `'
              onClick="handleGuess('` + letter + `')"
            >
              ` + letter + `
            </button>
          `).join('');

    document.getElementById('keyboard').innerHTML = buttonsHTML;
}

function nextColor() {
    const color = randomColor()
    updateColors(color.hex)
    word = color.name
    restart()
}

function randomColor() {
    return colorNameList.randomItem()
}

function updateColors(hex) {
    document.body.style.backgroundColor = hex
    for (let letter of keyboardLetters) {
        document.getElementById(letter).style.backgroundColor = adjustBrightness(hex, -20);
        document.getElementById(letter).style.borderColor = adjustBrightness(hex, -20);
    }
}

function adjustBrightness(color, amount) {
    return '#' + color.replace(/^#/, '').replace(/../g, color => ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
}

function restart() {
    maskedWord = word.replace(/[a-zA-Z]/g, '_')
    clear()
    updateScreen()
}

function clear() {
    usedLetters = new Set()
    misses = 0
    for (let letter of keyboardLetters)
        document.getElementById(letter).disabled = false;
}

function handleGuess(letter) {
    if (word === maskedWord) return
    if (usedLetters.has(letter)) return
    if (!word.includes(letter) && !word.includes(letter.toUpperCase())) misses++

    usedLetters.add(letter)
    document.getElementById(letter).disabled = true;

    updateMaskedWord(letter)
    updateScreen()
}

function updateMaskedWord(letter) {
    for (let index = 0; index < word.length; index++) {
        if (word[index] == letter || word[index] == letter.toUpperCase()) {
            maskedWord = maskedWord.replaceAt(index, word[index])
        }
    }
}

function updateScreen() {
    document.getElementById('colorName').textContent = maskedWord
    document.getElementById('usedLetters').textContent = 'Letters used: ' + Array.from(usedLetters).sort()
    document.getElementById('misses').textContent = 'Misses: ' + misses
}

function surrender() {
    maskedWord = word
    updateScreen()
}



Array.prototype.randomItem = function() {
    return this[Math.floor(Math.random() * this.length)];
}

String.prototype.replaceAt = function (index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}



window.onload = init

document.addEventListener('keydown', function (event) {
    const key = event.key.toLowerCase()
    if (key == ' ' || key == "😃") { nextColor(); return }
    if (key == '?' || key == "🤔") { surrender(); return }
    if (!keyboardLetters.includes(key)) return
    handleGuess(key)
})

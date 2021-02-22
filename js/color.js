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
              style='color: #ffffff'
              id="` + letter + `"
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
    document.documentElement.style.setProperty('--backgroundColor', hex)
    document.documentElement.style.setProperty('--darkerBackgroundColor', adjustBrightness(hex, -50))
    document.documentElement.style.setProperty('--lighterBackgroundColor', adjustBrightness(hex, +20))
}

function adjustBrightness(color, amount) {
    return '#' + color.replace(/^#/, '').replace(/../g, color => ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
}

function restart() {
    maskWord();
    clear()
    updateScreen()
}

function maskWord() {
    maskedWord = word.replace(/[a-zA-Z]/g, '_');
}

function clear() {
    usedLetters = new Set()
    for (let letter of keyboardLetters)
        {
            document.getElementById(letter).disabled = false;
            document.getElementById(letter).style.color = 'white'
        }

}

function handleGuess(letter) {
    if (word === maskedWord) return
    if (usedLetters.has(letter)) return

    if (!word.includes(letter) && !word.includes(letter.toUpperCase())) 
        missed(letter)

    usedLetters.add(letter)
    document.getElementById(letter).disabled = true;

    updateMaskedWord(letter)
    updateScreen()
}

function missed(letter) {
    document.getElementById(letter).style.color = 'red'
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
}

function surrender() {
    maskedWord = word
    updateScreen()
}


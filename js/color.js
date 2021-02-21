let word = ''
let maskedWord = ''

async function nextColor() {
    const color = await randomColor()
    updateColor(color.hex)
    word = color.name
    start()
}

function updateColor(hex) {
    document.getElementById('colorRectangle').style.backgroundColor = hex
}

async function randomColor() {
    let response = await fetch('https://api.color.pizza/v1/' + randomHex())
    let data = await response.json()
    return data.colors[0]
}

function randomHex() {
    return Math.random().toString().substr(-6)
}

function randomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}



function start() {
    maskedWord = word.replace(/\S/g, '_')
    generateButtons()
    clear()
    resetText()
}

function resetText() {
    document.getElementById('colorName').textContent = maskedWord
}

function clear() {
    usedLetters = new Set()
}

function generateButtons() {
    let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
        `
            <button
              class="btn btn-lg btn-primary m-2"
              id='` + letter + `'
              onClick="handleGuess('` + letter + `')"
            >
              ` + letter + `
            </button>
          `).join('');

    document.getElementById('keyboard').innerHTML = buttonsHTML;
}

function handleGuess(letter) {
    if (usedLetters.has(letter)) return

    updateMaskedWord(letter)
    usedLetters.add(letter)
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
    document.getElementById('usedLetters').textContent = Array.from(usedLetters).sort()
    document.getElementById('attempts').textContent = usedLetters.size
    document.getElementById('colorName').textContent = maskedWord
}

function surrender() {
    maskedWord = word
    updateScreen()
}

String.prototype.replaceAt = function (index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

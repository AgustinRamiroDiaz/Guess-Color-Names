function init() {
    generateButtons()
    nextColor()
}


function generateButtons() {
    keyboardLetters = 'abcdefghijklmnopqrstuvwxyz'
    let buttonsHTML = keyboardLetters.split('').map(letter =>
        `
            <button
              class="btn m-1"
              style="color: #ffffff"
              id='` + letter + `'
              onClick="handleGuess('` + letter + `')"
            >
              ` + letter + `
            </button>
          `).join('');

    document.getElementById('keyboard').innerHTML = buttonsHTML;
}


async function nextColor() {
    const color = await randomColor()
    updateColors(color.hex)
    word = color.name
    restart()
}

async function randomColor() {
    let response = await fetch('https://api.color.pizza/v1/' + randomHex())
    let data = await response.json()
    return data.colors[0]
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


function randomHex() {
    return Math.random().toString().substr(-6)
}



function restart() {
    maskedWord = word.replace(/[a-zA-Z]/g, '_')
    clear()
    updateScreen()
}

function clear() {
    usedLetters = new Set()
    misses = 0
}

function handleGuess(letter) {
    if (word === maskedWord) return
    if (usedLetters.has(letter)) return
    if (!word.includes(letter) && !word.includes(letter.toUpperCase())) misses++

    usedLetters.add(letter)

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






function randomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}


String.prototype.replaceAt = function (index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}


window.onload = init

document.addEventListener('keydown', function (event) {
    const key = event.key.toLowerCase()
    if (!keyboardLetters.includes(key)) return
    handleGuess(key)
})

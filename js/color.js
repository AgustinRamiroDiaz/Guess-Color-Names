function init() {
    generateButtons()
    nextColor()
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


async function nextColor() {
    const color = await randomColor()
    updateColor(color.hex)
    word = color.name
    restart()
}

function updateColor(hex) {
    document.body.style.backgroundColor = hex
}

async function randomColor() {
    let response = await fetch('https://api.color.pizza/v1/' + randomHex())
    let data = await response.json()
    return data.colors[0]
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
    document.getElementById('usedLetters').textContent = 'Letters used: ' + Array.from(usedLetters).sort()
    document.getElementById('misses').textContent = 'Misses: ' + usedLetters.size
    document.getElementById('colorName').textContent = maskedWord
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
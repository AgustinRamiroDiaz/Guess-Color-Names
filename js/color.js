
async function nextColor() {
    const color = await randomColor()
    console.log(color)
    updateColor(color.hex)
    hangman = new Hangman(color.name)
    hangman.start()
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



class Hangman {
    constructor(word) {
        this.word = word
        this.maskedWord = this.word.replace(/\S/g, '_')
        this.generateButtons()
        this.clear()
    }

    start() {
        this.resetText()
    }

    resetText() {
        document.getElementById('colorName').textContent = this.maskedWord
    }

    clear() {
        this.usedLetters = new Set()
    }

    generateButtons() {
        let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz0123456789'.split('').map(letter =>
            `
            <button
              class="btn btn-lg btn-primary m-2"
              id='` + letter + `'
              onClick="hangman.handleGuess('` + letter + `')"
            >
              ` + letter + `
            </button>
          `).join('');

        document.getElementById('keyboard').innerHTML = buttonsHTML;
    }

    handleGuess(letter) {
        if (this.usedLetters.has(letter)) return
        
        this.updateMaskedWord(letter)
        this.usedLetters.add(letter)
        this.updateScreen()
    }

    updateMaskedWord(letter) {
        for (let index = 0; index < this.word.length; index++) {
            if (this.word[index] == letter || this.word[index] == letter.toUpperCase()) {
                this.maskedWord = this.maskedWord.replaceAt(index, this.word[index])
            }
        }
    }

    updateScreen() {
        document.getElementById('usedLetters').textContent = Array.from(this.usedLetters).sort()
        document.getElementById('attempts').textContent = this.usedLetters.size
        document.getElementById('colorName').textContent = this.maskedWord
    }

    surrender() {
        this.maskedWord = this.word
        this.updateScreen()
    }
}

String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}
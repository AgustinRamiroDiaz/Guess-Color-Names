
function nextColor() {
    const color = randomColor()
    updateColor(color.hex)
    hangman = new Hangman(color.name)
    hangman.start()
}

function updateColor(hex) {
    document.getElementById('colorRectangle').style.backgroundColor = hex
}

function randomColor() {
    return randomItem(colorsFromJSON())
}

// TODO fetch from JSON
function colorsFromJSON() {
    return JSON.parse(
        '  [{ "name": "100 Mph", "hex": "#c93f38" }, { "name": "18th Century Green", "hex": "#a59344" }, { "name": "1975 Earth Red", "hex": "#7b463b" }, { "name": "1989 Miami Hotline", "hex": "#dd3366" }, { "name": "20000 Leagues Under the Sea", "hex": "#191970" }, { "name": "24 Karat", "hex": "#ab7f46" }, { "name": "3AM in Shibuya", "hex": "#225577" }, { "name": "3am Latte", "hex": "#c0a98e" }, { "name": "400XT Film", "hex": "#d2d2c0" }, { "name": "5-Masted Preußen", "hex": "#9bafad" }, { "name": "8 Bit Eggplant", "hex": "#990066" }, { "name": "90% Cocoa", "hex": "#3d1c02" }, { "name": "A Brand New Day", "hex": "#ffaabb" }, { "name": "A Certain Shade Of Green", "hex": "#d1edee" }, { "name": "A Dime a Dozen", "hex": "#d3dde4" }, { "name": "A Hint of Incremental Blue", "hex": "#456789" }, { "name": "A La Mode", "hex": "#f6ecde" }, { "name": "A Lot of Love", "hex": "#ffbcc5" }, { "name": "A Pair of Brown Eyes", "hex": "#bfaf92" }, { "name": "A Smell of Bakery", "hex": "#f3e9d9" }, { "name": "A State of Mint", "hex": "#88ffcc" }, { "name": "Aare River", "hex": "#00b89f" }, { "name": "Aare River Brienz", "hex": "#05a3ad" }, { "name": "Aarhusian Sky", "hex": "#1150af" }, { "name": "Abaddon Black", "hex": "#231f20" }, { "name": "Abaidh White", "hex": "#f2f1e6" }, { "name": "Abalone", "hex": "#f8f3f6" }, { "name": "Abalone Shell", "hex": "#e1ded9" }, { "name": "Abandoned Mansion", "hex": "#94877e" }, { "name": "Abbey", "hex": "#4c4f56" }, { "name": "Abbey Road", "hex": "#a79f92" }, { "name": "Abbey Stone", "hex": "#aba798" }, { "name": "Abbey White", "hex": "#ece6d0" }, { "name": "Abbot", "hex": "#4d3c2d" }, { "name": "Abduction", "hex": "#166461" }, { "name": "Âbi Blue", "hex": "#5ba8ff" }, { "name": "Abilene Lace", "hex": "#eae3d2" }, { "name": "Ablaze", "hex": "#c04641" }, { "name": "Abomination", "hex": "#77aa77" }, { "name": "Abra Cadabra", "hex": "#966165" }, { "name": "Abra Goldenrod", "hex": "#eec400" }, { "name": "Absence of Light", "hex": "#15151c" }, { "name": "Absinthe Green", "hex": "#76b583" }, { "name": "Absinthe Turquoise", "hex": "#008a60" }, { "name": "Absolute Apricot", "hex": "#ff9944" }, { "name": "Absolute Zero", "hex": "#0048ba" }, { "name": "Abstract", "hex": "#e4cb97" }, { "name": "Abstract White", "hex": "#ede9dd" }, { "name": "Abundance", "hex": "#629763" }, { "name": "Abura Green", "hex": "#a19361" }, { "name": "Abyss", "hex": "#8f9e9d" }, { "name": "Abyssal Anchorfish Blue", "hex": "#1b2632" }, { "name": "Abyssal Blue", "hex": "#00035b" }, { "name": "Abyssal Depths", "hex": "#10246a" }, { "name": "Abyssal Waters", "hex": "#005765" }, { "name": "Abysse", "hex": "#3d5758" }, { "name": "Abyssopelagic Water", "hex": "#000033" }, { "name": "Acacia", "hex": "#dacd65" }, { "name": "Acacia Green", "hex": "#486241" }, { "name": "Acacia Haze", "hex": "#969c92" }, { "name": "Academic Blue", "hex": "#2c3e56" }, { "name": "Academy Purple", "hex": "#525367" }, { "name": "Acadia", "hex": "#35312c" }, { "name": "Acadia Bloom", "hex": "#e5b7be" }, { "name": "Acai", "hex": "#46295a" }, { "name": "Acai Berry", "hex": "#42314b" }, { "name": "Acai Juice", "hex": "#942193" }, { "name": "Acajou", "hex": "#4c2f27" }, { "name": "Acanthus", "hex": "#9899a7" }, { "name": "Acanthus Leaf", "hex": "#90977a" }, { "name": "Acapulco", "hex": "#75aa94" }, { "name": "Acapulco Cliffs", "hex": "#4e9aa8" }, { "name": "Acapulco Dive", "hex": "#65a7dd" }, { "name": "Acapulco Sun", "hex": "#eb8a44" }, { "name": "Accent Green Blue", "hex": "#208468" }, { "name": "Accent Orange", "hex": "#e56d00" }, { "name": "Accessible Beige", "hex": "#d2c7b7" }, { "name": "Accolade", "hex": "#7c94b2" }, { "name": "Accursed Black", "hex": "#090807" }, { "name": "Ace", "hex": "#c7cce7" }, { "name": "Aceituna Picante", "hex": "#727a5f" }, { "name": "Aceto Balsamico", "hex": "#4e4f48" }, { "name": "Acid", "hex": "#00ff22" }, { "name": "Acid Blond", "hex": "#efedd7" }, { "name": "Acid Candy", "hex": "#a8c74d" }, { "name": "Acid Drop", "hex": "#11ff22" }]  ')
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
Vue.component('keyboard-letter-button', {
    props: {
        letter: {
            type: String,
            required: true,
        }
    },
    template: `
    <button
    class="btn btn-lg m-1"
    style='color: #ffffff'
    :id="letter"
    @click="handleGuess()"
    > 
    {{ letter }}
    </button>
    `,
    methods: {
        handleGuess() {
            console.log('Magacostada')
        }
    }
})

var app = new Vue({
    el: '#app',
    data: {
        word: '',
        maskedWord: '',
        keyboardLetters: 'abcdefghijklmnopqrstuvwxyz',

    },
    methods: {

        init() {
            this.generateButtons()
            this.nextColor()
        },


        generateButtons() {
            const buttonsHTML = this.keyboardLetters.split('').map(letter =>
                `
                <button
                class="btn btn-lg m-1"
                style='color: #ffffff'
                id="` + letter + `"
                onClick="app.handleGuess('` + letter + `')"
                >
                ` + letter + `
                </button>
                `).join('');

            document.getElementById('keyboard').innerHTML = buttonsHTML;
        },


        nextColor() {
            const color = this.randomColor()
            this.updateColors(color.hex)
            this.word = color.name
            this.restart()
        },


        randomColor() {
            return colorNameList.randomItem()
        },

        updateColors(hex) {
            document.documentElement.style.setProperty('--backgroundColor', hex)
            document.documentElement.style.setProperty('--darkerBackgroundColor', this.adjustBrightness(hex, -50))
            document.documentElement.style.setProperty('--lighterBackgroundColor', this.adjustBrightness(hex, +20))
        },

        adjustBrightness(color, amount) {
            return '#' + color.replace(/^#/, '').replace(/../g, color => ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
        },

        restart() {
            this.maskWord();
            this.clear()
        },

        maskWord() {
            this.maskedWord = this.word.replace(/[a-zA-Z]/g, '_');
        },

        clear() {
            this.usedLetters = new Set()
            for (let letter of this.keyboardLetters) {
                document.getElementById(letter).disabled = false;
                document.getElementById(letter).style.color = 'white'
            }

        },

        handleGuess(letter) {
            if (this.word === this.maskedWord) return
            if (this.usedLetters.has(letter)) return

            if (!this.word.includes(letter) && !this.word.includes(letter.toUpperCase()))
                this.missed(letter)

            this.usedLetters.add(letter)
            document.getElementById(letter).disabled = true;

            this.updateMaskedWord(letter)
        },

        missed(letter) {
            document.getElementById(letter).style.color = 'red'
        },

        updateMaskedWord(letter) {
            for (let index = 0; index < this.word.length; index++) {
                if (this.word[index] == letter || this.word[index] == letter.toUpperCase()) {
                    this.maskedWord = this.maskedWord.replaceAt(index, this.word[index])
                }
            }
        },

        surrender() {
            this.maskedWord = this.word
        },

    }
})
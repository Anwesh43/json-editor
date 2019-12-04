class KeyDiv {

    constructor(text) {
        this.div = document.createElement('div')
        this.div.className = 'textBlock'
        this.div.innerHTML = text
    }
}

class ValueField {

    constructor() {
        this.div = document.createElement('div')
        this.text = document.createElement('input')
        this.btn = document.createElement('button')
    }

    addAttributes() {
        this.div.appendChild(this.text)
        this.div.appendChild(this.btn)
        this.div.className = 'valueBlock'
        this.btn.innerHTML = 'EDIT'

    }
}

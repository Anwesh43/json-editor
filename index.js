class Field {
    constructor() {
        this.div = document.createElement('div')
    }

    appendToParent(parent) {
        parent.appendChild(this.div)
    }
}

class KeyDiv extends Field {

    constructor(text) {
        super()
        this.div.className = 'textBlock'
        this.div.innerHTML = text
    }
}

class ValueField extends Field {

    constructor(text) {
        super()
        this.text = document.createElement('input')
        this.btn = document.createElement('button')
        this.addAttributes(text)
    }

    addAttributes(text) {
        this.div.appendChild(this.text)
        this.div.appendChild(this.btn)
        this.div.className = 'valueBlock'
        this.btn.innerHTML = 'EDIT'
        this.input.value = text
    }
}

class JsonField extends Field {

    constructor(key, value) {
        super()
        this.div.className = 'jsonField'
        this.keyDiv = new KeyDiv(key)
        this.parse(value)
    }

    parse(value) {
        if (typeof(value) !== "object" || typeof(value) !== "function") {
            this.valueDiv = new ValueField(value)
            this.div.appendChild(this.valueDiv)
        } else if (typeof(value) == "object") {
              Object.keys(value).forEach((key) => {
                  const valueField = new JsonField(key, value[key])
                  valueField.appendToParent(this.div)
              })
        }
    }
}

class JsonRoot extends Field {

    constructor(json) {
        super()
        this.parseJson(json)
    }

    parseJson(json) {
        Object.keys(json).forEach((key) => {
            const jsonField = new JsonField(key, json[key])
            jsonField.appendToParent(this.div)
        })
    }

}

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
        this.text.value = text
    }
}

class JsonField extends Field {

    constructor(key, value) {
        super()
        this.div.className = 'jsonField'
        this.keyDiv = new KeyDiv(key)
        this.keyDiv.appendToParent(this.div)
        this.parse(value)
    }

    toggleVisibility() {
        this.div.style.visibility = this.div.style.visibility === "hidden" ? "visible" : "hidden"
    }

    parse(value) {
        const valueType = typeof(value)
        if (valueType !== "object") {
            this.valueDiv = new ValueField(value)
            this.valueDiv.appendToParent(this.div)
        } else {
              const valueFields = []
              const btn = document.createElement('button')
              btn.innerHTML = 'show'
              //this.div.appendChild(btn)
              Object.keys(value).forEach((key) => {
                  const valueField = new JsonField(key, value[key])
                  valueFields.push(valueField)
                  valueField.appendToParent(this.div)
                  //valueField.toggleVisibility()
              })
              btn.onclick = () => {
                  this.valueFields.forEach((valueField) => {
                      valueField.toggleVisibility()
                      btn.innerHTML = btn.innerHTML === "show" ? "hide" : "show"
                  })
              }
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

const initJsonRoot = (json) => {
    const jsonObj = typeof(json) === "string" ? JSON.parse(json) : json
    const jsonRoot = new JsonRoot(jsonObj)
    jsonRoot.appendToParent(document.body)
}

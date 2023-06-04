import "https://unpkg.com/n3/browser/n3.min.js"

class Graph extends HTMLElement {
    constructor() {
        super()
        addEventListener("DOMContentLoaded", this.#onDomContentLoaded.bind(this))
    }

    async initialize() {
        await super.initialize(this.#load(), null, [])
        this.#script.remove()
        this.replaceWithMeaningfulChildren()
    }

    async #onDomContentLoaded() {
        await this.initialize()
    }

    #load() {
        const dataset = new N3.Store()
        dataset.addQuads(new N3.Parser().parse(this.#script.textContent))

        return dataset
    }

    get #script() {
        return this.querySelector(`script[type="text/turtle"]`)
    }
}

customElements.define("rdf-graph", Graph)

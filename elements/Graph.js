import "https://unpkg.com/n3/browser/n3.min.js"

class Graph extends HTMLElement {
    constructor() {
        super()
        addEventListener("DOMContentLoaded", this.#onDomContentLoaded.bind(this))
    }

    initialize(){
        super.initialize(this.#load(), null, [])
        const rdf = this.querySelector("script") // TODO: Filter to Turtle
        rdf.remove()
        this.replaceWithMeaningfulChildren()
    }

    #onDomContentLoaded() {
        this.initialize()
    }

    #load() {
        const rdf = this.querySelector("script").textContent // TODO: Filter to Turtle

        const dataset = new N3.Store()
        dataset.addQuads(new N3.Parser().parse(rdf))

        return dataset
    }
}

customElements.define("rdf-graph", Graph)

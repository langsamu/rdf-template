import {Comunica} from "./Comunica.js"

class If extends HTMLElement {
    async initialize(graph, context, stack) {
        const comunica = new Comunica.QueryEngine()
        const result = await comunica.queryBoolean(this.#script.textContent, {sources: [graph]});
        if (result) {
            await super.initialize(graph, context, stack)
            this.#script.remove()
            this.replaceWithMeaningfulChildren()
        } else {
            this.remove()
        }
    }

    get #script() {
        return this.querySelector(`script[type="application/sparql-query"]`)
    }
}

customElements.define("rdf-if", If)

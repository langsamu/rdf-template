import {Comunica} from "./Comunica.js"

class If extends HTMLElement {
    async initialize(graph, context, stack) {
        await super.initialize(graph, context, stack)

        const comunica = new Comunica.QueryEngine()
        const result = await comunica.queryBoolean(this.#script.textContent, {sources: [graph]});
        if (result) {
            await this.#instantiate(graph, context, stack)
            this.#script.remove()
            this.replaceWithMeaningfulChildren()
        } else {
            this.remove()
        }
    }

    async #instantiate(graph, context, stack) {
        for (const template of [...this.getElementsByTagName("TEMPLATE")]) {
            for (const child of [...template.content.cloneNode(true).childNodes]) {
                this.parentNode.appendChild(child)

                if (child instanceof Element) {
                    await child.initialize(graph, context, stack)
                }
            }
            template.remove()
        }
    }

    get #script() {
        return this.querySelector(`script[type="application/sparql-query"]`)
    }
}

customElements.define("rdf-if", If)

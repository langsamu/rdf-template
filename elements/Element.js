class Element extends HTMLElement {
    async initialize(graph, context, stack) {
        if (this.dataset.name) {
            const element = this.#createElement()
            element.replaceChildren(...this.childNodes)
            this.replaceWith(element)
            await element.initialize(graph, context, stack)
        } else {
            this.remove()
        }
    }

    #createElement() {
        const options = {is: this.dataset.is}

        return this.dataset.namespace ?
            this.ownerDocument.createElementNS(this.dataset.namespace, this.dataset.name, options) :
            this.ownerDocument.createElement(this.dataset.name, options)
    }
}

customElements.define("rdf-element", Element)

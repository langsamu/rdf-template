class Attribute extends HTMLElement {
    async initialize(graph, context, stack) {
        await super.initialize(graph, context, stack)

        if (this.dataset.name) {
            this.parentElement.setAttribute(this.dataset.name, this.innerText.trim())
        }

        this.remove()
    }
}

customElements.define("rdf-attribute", Attribute)

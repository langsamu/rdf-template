class Attribute extends HTMLElement {
    initialize(graph, context, stack) {
        super.initialize(graph, context, stack)

        if (this.dataset.name) {
            this.parentElement.setAttribute(this.dataset.name, this.innerText)
        }

        this.remove()
    }
}

customElements.define("rdf-attribute", Attribute)

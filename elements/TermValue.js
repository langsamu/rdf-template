class TermValue extends HTMLElement {
    initialize(graph, context, stack) {
        this.replaceWith(this.ownerDocument.createTextNode(context?.value))
    }
}

customElements.define("rdf-value", TermValue)

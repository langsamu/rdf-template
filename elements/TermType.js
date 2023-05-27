class TermType extends HTMLElement {
    initialize(graph, context, stack) {
        this.replaceWith(this.ownerDocument.createTextNode(context?.termType))
    }
}

customElements.define("rdf-type", TermType)

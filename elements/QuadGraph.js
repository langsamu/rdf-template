class QuadGraph extends HTMLElement {
    initialize(graph, context, stack) {
        super.initialize(graph, context?.graph, stack)
        this.replaceWith(...this.childNodes)
    }
}

customElements.define("rdf-quad-graph", QuadGraph)

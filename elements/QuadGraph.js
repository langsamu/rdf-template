class QuadGraph extends HTMLElement {
    async initialize(graph, context, stack) {
        await super.initialize(graph, context?.graph, stack)
        this.replaceWith(...this.childNodes)
    }
}

customElements.define("rdf-quad-graph", QuadGraph)

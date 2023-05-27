class QuadObject extends HTMLElement {
    initialize(graph, context, stack) {
        super.initialize(graph, context?.object, stack)
        this.replaceWithMeaningfulChildren()
    }
}

customElements.define("rdf-quad-object", QuadObject)

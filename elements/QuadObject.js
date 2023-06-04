class QuadObject extends HTMLElement {
    async initialize(graph, context, stack) {
        await super.initialize(graph, context?.object, stack)
        this.replaceWithMeaningfulChildren()
    }
}

customElements.define("rdf-quad-object", QuadObject)

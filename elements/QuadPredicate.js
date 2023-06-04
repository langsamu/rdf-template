class QuadPredicate extends HTMLElement {
    async initialize(graph, context, stack) {
        await super.initialize(graph, context?.predicate, stack)
        this.replaceWithMeaningfulChildren()

    }
}

customElements.define("rdf-quad-predicate", QuadPredicate)

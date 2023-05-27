class QuadPredicate extends HTMLElement {
    initialize(graph, context, stack) {
        super.initialize(graph, context?.predicate, stack)
        this.replaceWithMeaningfulChildren()

    }
}

customElements.define("rdf-quad-predicate", QuadPredicate)

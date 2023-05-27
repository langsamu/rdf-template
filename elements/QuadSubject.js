class QuadSubject extends HTMLElement {
    initialize(graph, context, stack) {
        super.initialize(graph, context?.subject, stack)
        this.replaceWithMeaningfulChildren()
    }
}

customElements.define("rdf-quad-subject", QuadSubject)

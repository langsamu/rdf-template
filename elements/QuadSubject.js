class QuadSubject extends HTMLElement {
    async initialize(graph, context, stack) {
        await super.initialize(graph, context?.subject, stack)
        this.replaceWithMeaningfulChildren()
    }
}

customElements.define("rdf-quad-subject", QuadSubject)

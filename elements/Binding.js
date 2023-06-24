class Binding extends HTMLElement {
    async initialize(graph, context, stack) {
        await super.initialize(graph, context.get(this.dataset.name), stack)
        this.replaceWithMeaningfulChildren()
    }
}

customElements.define("rdf-binding", Binding)

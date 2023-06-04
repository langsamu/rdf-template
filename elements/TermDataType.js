class TermDataType extends HTMLElement {
    async initialize(graph, context, stack) {
        if (context.datatype) {
            await super.initialize(graph, context.datatype, stack)
            this.replaceWithMeaningfulChildren()
        } else {
            this.remove()
        }
    }
}

customElements.define("rdf-datatype", TermDataType)

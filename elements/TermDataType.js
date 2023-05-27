class TermDataType extends HTMLElement {
    initialize(graph, context, stack) {
        if (context.datatype) {
            super.initialize(graph, context.datatype, stack)
            this.replaceWithMeaningfulChildren()
        } else {
            this.remove()
        }
    }
}

customElements.define("rdf-datatype", TermDataType)

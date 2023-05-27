class TermLanguage extends HTMLElement {
    initialize(graph, context, stack) {
        if (context.language) {
            this.replaceWith(this.ownerDocument.createTextNode(context.language))
        }else{
            this.remove()
        }
    }
}

customElements.define("rdf-language", TermLanguage)

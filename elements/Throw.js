import {RdfTemplateUserError} from "./RdfTemplateUserError.js"

class Throw extends HTMLElement {
    initialize(graph, context, stack) {
        throw new RdfTemplateUserError(this.dataset.name, this.dataset.message, graph, context, stack)
    }
}

customElements.define("rdf-throw", Throw)

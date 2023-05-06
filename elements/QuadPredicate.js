import {ContextComponentAwareElement} from "./ContextComponentAwareElement.js"

export class QuadPredicate extends ContextComponentAwareElement {
    getContextComponent(context) {
        return context.predicate
    }
}

customElements.define("rdf-quad-predicate", QuadPredicate)

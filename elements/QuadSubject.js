import {ContextComponentAwareElement} from "./ContextComponentAwareElement.js"

export class QuadSubject extends ContextComponentAwareElement {
    getContextComponent(context) {
        return context.subject
    }
}

customElements.define("rdf-quad-subject", QuadSubject)

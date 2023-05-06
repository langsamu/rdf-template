import {ContextComponentAwareElement} from "./ContextComponentAwareElement.js"

export class QuadObject extends ContextComponentAwareElement {
    getContextComponent(context) {
        return context.object
    }
}

customElements.define("rdf-quad-object", QuadObject)

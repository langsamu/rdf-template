import {ContextComponentAwareElement} from "./ContextComponentAwareElement.js"

export class QuadGraph extends ContextComponentAwareElement {
    getContextComponent(context) {
        return context.graph
    }
}

customElements.define("rdf-quad-graph", QuadGraph)

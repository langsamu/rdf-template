import "https://unpkg.com/n3/browser/n3.min.js"
import {Templated} from "./Templated.js"

class UriNode extends Templated {
    async initialize(graph, context, stack) {
        const subject = N3.DataFactory.namedNode(this.dataset.uri)
        const quad = N3.DataFactory.quad(subject, subject, subject)

        await this.instantiateTemplates(graph, context, stack, [quad])
    }
}

customElements.define("rdf-uri-node", UriNode)

import {Comunica} from "./Comunica.js"
import {Sparql} from "./Sparql.js"

class Construct extends Sparql {
    async initialize(graph, context, stack) {
        await super.initialize(graph, context, stack)

        const distinctQuads = await this.#query(graph, context)
        this.sparqlScript.remove()

        await this.instantiateTemplates(graph, context, stack, distinctQuads)
    }

    async #query(graph, context) {
        const comunicaContext = {sources: [graph]}

        this.prebind(comunicaContext, graph, context)

        return (await new Comunica.QueryEngine().queryQuads(this.sparqlScript.textContent, comunicaContext)).toArray()
    }
}

customElements.define("rdf-construct", Construct)

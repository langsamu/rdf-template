import {Comunica} from "../Comunica.js"
import {Sparql} from "./Sparql.js"

class If extends Sparql {
    async initialize(graph, context, stack) {
        await super.initialize(graph, context, stack)

        if (await this.#ask(graph, context)) {
            this.sparqlScript.remove()
            await this.instantiateTemplates(graph, context, stack, null)
        } else {
            this.remove()
        }
    }

    async #ask(graph, context) {
        const comunicaContext = {sources: [graph]}

        this.prebind(comunicaContext, graph, context)

        return await new Comunica.QueryEngine().queryBoolean(this.sparqlScript.textContent, comunicaContext)
    }
}

customElements.define("rdf-if", If)

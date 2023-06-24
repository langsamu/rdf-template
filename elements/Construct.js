import {Comunica} from "./Comunica.js"
import {Templated} from "./Templated.js"
import {ContextQuadThisBinding} from "./ContextQuadThisBinding.js"
import {ContextNodeThisBinding} from "./ContextNodeThisBinding.js"

class Construct extends Templated {
    async initialize(graph, context, stack) {
        await super.initialize(graph, context, stack)

        const distinctQuads = await this.#query(graph, context)
        this.#script.remove()

        await this.instantiateTemplates(graph, context, stack, distinctQuads)
    }

    async #query(graph, context) {
        const comunicaContext = {sources: [graph]}

        if (context !== null) {
            if ("subject" in context && "predicate" in context && "object" in context && "graph" in context) {
                comunicaContext.initialBindings = new ContextQuadThisBinding(context)
            } else if ("termType" in context && "value" in context) {
                comunicaContext.initialBindings = new ContextNodeThisBinding(context)
            }
        }

        return (await new Comunica.QueryEngine().queryQuads(this.#script.textContent, comunicaContext)).toArray()
    }

    get #script() {
        return this.querySelector(`script[type="application/sparql-query"]`)
    }
}

customElements.define("rdf-construct", Construct)

import {Comunica} from "./Comunica.js"
import {Templated} from "./Templated.js"
import {ContextQuadThisBinding} from "./ContextQuadThisBinding.js"
import {ContextNodeThisBinding} from "./ContextNodeThisBinding.js"

class If extends Templated {
    async initialize(graph, context, stack) {
        await super.initialize(graph, context, stack)

        if (await this.#ask(graph, context)) {
            this.#script.remove()
            await this.instantiateTemplates(graph, context, stack, null)
        } else {
            this.remove()
        }
    }

    async #ask(graph, context) {
        const comunicaContext = {sources: [graph]}

        if (context !== null) {
            if ("subject" in context && "predicate" in context && "object" in context && "graph" in context) {
                comunicaContext.initialBindings = new ContextQuadThisBinding(context)
            } else if ("termType" in context && "value" in context) {
                comunicaContext.initialBindings = new ContextNodeThisBinding(context)
            }
        }

        return await new Comunica.QueryEngine().queryBoolean(this.#script.textContent, comunicaContext)
    }

    get #script() {
        return this.querySelector(`script[type="application/sparql-query"]`)
    }
}

customElements.define("rdf-if", If)

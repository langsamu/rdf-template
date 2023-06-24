import {Templated} from "./Templated.js"
import {ContextQuadThisBinding} from "../ContextQuadThisBinding.js"
import {ContextNodeThisBinding} from "../ContextNodeThisBinding.js"

export class Sparql extends Templated {
    prebind(comunicaContext, graph, context) {
        if (context !== null) {
            if ("subject" in context && "predicate" in context && "object" in context && "graph" in context) {
                comunicaContext.initialBindings = new ContextQuadThisBinding(context)
            } else if ("termType" in context && "value" in context) {
                comunicaContext.initialBindings = new ContextNodeThisBinding(context)
            }
        }
    }

    get sparqlScript() {
        return this.querySelector(`script[type="application/sparql-query"]`)
    }
}

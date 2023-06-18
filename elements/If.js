import {Comunica} from "./Comunica.js"

class If extends HTMLElement {
    async initialize(graph, context, stack) {
        await super.initialize(graph, context, stack)

        if (await this.#ask(graph, context)) {
            await this.#instantiate(graph, context, stack)
            this.#script.remove()
            this.replaceWithMeaningfulChildren()
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

    async #instantiate(graph, context, stack) {
        for (const template of [...this.getElementsByTagName("TEMPLATE")]) {
            for (const child of [...template.content.cloneNode(true).childNodes]) {
                this.parentNode.appendChild(child)

                if (child instanceof Element) {
                    await child.initialize(graph, context, stack)
                }
            }
            template.remove()
        }
    }

    get #script() {
        return this.querySelector(`script[type="application/sparql-query"]`)
    }
}

class ContextNodeThisBinding {
    #context

    constructor(context) {
        this.#context = context
    }

    get(variable) {
        if (variable.value === "this") {
            return this.#context
        }
    }
}

class ContextQuadThisBinding {
    #context

    constructor(context) {
        this.#context = context
    }

    get(variable) {
        switch (variable.value) {
            case "thisSubject":
                return this.#context.subject
            case "thisPredicate":
                return this.#context.predicate
            case "thisObject":
                return this.#context.object
            case "thisGraph":
                return this.#context.graph
        }
    }
}

customElements.define("rdf-if", If)

import "https://unpkg.com/n3/browser/n3.min.js"
import {Comunica} from "./Comunica.js"

class Construct extends HTMLElement {
    static #CYCLE_MARKER = N3.DataFactory.namedNode("urn:rdf-components:cycle-marker")
    static #CYCLE_QUAD = N3.DataFactory.quad(
        Construct.#CYCLE_MARKER,
        Construct.#CYCLE_MARKER,
        Construct.#CYCLE_MARKER,
        Construct.#CYCLE_MARKER)

    async initialize(graph, context, stack) {
        await super.initialize(graph, context, stack)

        const distinctQuads = await this.#query(graph, context)
        this.#script.remove()

        if (this.dataset.template) {
            const template = this.ownerDocument.getElementById(this.dataset.template)
            await this.#instantiate(graph, distinctQuads, template, this, stack)
        } else {
            for (const template of [...this.getElementsByTagName("TEMPLATE")]) {
                await this.#instantiate(graph, distinctQuads, template, template.parentNode, stack)
                template.remove()
            }
        }

        this.replaceWithMeaningfulChildren()
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

    async #instantiate(graph, quads, template, parent, stack) {
        for (const quad of quads) {
            const isCycle = Construct.#isCycle(stack, quad)
            let q = quad
            if (isCycle) {
                const t = "mark"
                // const t="throw"
                // const t = "skip"
                switch (t) {
                    case "skip":
                        continue

                    case "throw":
                        throw new CycleError("Cycle detected", quad)

                    case "mark":
                        q = Construct.#CYCLE_QUAD
                }
            }

            stack.push(q)

            for (const child of [...template.content.cloneNode(true).childNodes]) {
                parent.appendChild(child)

                if (child instanceof Element) {
                    await child.initialize(graph, q, stack)
                }
            }
            stack.pop()
        }
    }

    static #isCycle(stack, quad) {
        for (const stackElement of stack) {
            if (stackElement.equals(quad)) {
                return true
            }
        }

        return false
    }

    get #script() {
        return this.querySelector(`script[type="application/sparql-query"]`)
    }
}

class CycleError extends Error {
    quad

    constructor(message, quad) {
        super(message)

        this.name = this.constructor.name
        this.quad = quad
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

customElements.define("rdf-construct", Construct)

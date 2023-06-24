import "https://unpkg.com/n3/browser/n3.min.js"

export class Templated extends HTMLElement {
    static #CYCLE_MARKER = N3.DataFactory.namedNode("urn:rdf-components:cycle-marker")
    static #CYCLE_QUAD = N3.DataFactory.quad(
        Templated.#CYCLE_MARKER,
        Templated.#CYCLE_MARKER,
        Templated.#CYCLE_MARKER,
        Templated.#CYCLE_MARKER)

    async instantiateTemplates(graph, context, stack, result) {
        if (this.dataset.template) {
            const template = this.ownerDocument.getElementById(this.dataset.template)
            await this.#instantiate(graph, context, stack, result, template, this)
        } else {
            for (const template of [...this.getElementsByTagName("TEMPLATE")]) {
                await this.#instantiate(graph, context, stack, result, template, template.parentNode)
                template.remove()
            }
        }

        this.replaceWithMeaningfulChildren()
    }

    async #instantiate(graph, context, stack, result, template, parent) {
        if (result) {
            for (const quad of result) {
                const isCycle = Templated.#isCycle(stack, quad)
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
                            q = Templated.#CYCLE_QUAD
                    }
                }

                stack.push(q)
                await this.#initialize(template, parent, graph, q, stack);
                stack.pop()
            }
        } else {
            await this.#initialize(template, parent, graph, context, stack);
        }
    }

    async #initialize(template, parent, graph, context, stack) {
        for (const child of [...template.content.cloneNode(true).childNodes]) {
            parent.appendChild(child)

            if (child instanceof Element) {
                await child.initialize(graph, context, stack)
            }
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

}

class CycleError extends Error {
    quad

    constructor(message, quad) {
        super(message)

        this.name = this.constructor.name
        this.quad = quad
    }
}

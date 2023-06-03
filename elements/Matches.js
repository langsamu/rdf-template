import "https://unpkg.com/n3/browser/n3.min.js"
import {QuadSet} from "../QuadSet.js"

class Matches extends HTMLElement {
    static #extractor = /(?<=^{)\w+(?=}$)/
    static #CYCLE_MARKER = N3.DataFactory.namedNode("urn:rdf-components:cycle-marker")
    static #CYCLE_QUAD = N3.DataFactory.quad(
        Matches.#CYCLE_MARKER,
        Matches.#CYCLE_MARKER,
        Matches.#CYCLE_MARKER,
        Matches.#CYCLE_MARKER)

    /**
     * @return {DOMTokenList}
     */
    get #groups() {
        const a = document.createElement("a")
        a.setAttribute("class", this.dataset.group)
        return a.classList
    }

    initialize(graph, context, stack) {
        const distinctQuads = this.#matches(graph, context)

        if (this.dataset.template) {
            const template = this.ownerDocument.getElementById(this.dataset.template)
            this.#instantiate(graph, distinctQuads, template, this, stack)
        } else {
            for (const template of [...this.getElementsByTagName("TEMPLATE")]) {
                this.#instantiate(graph, distinctQuads, template, template.parentNode, stack)
                template.remove()
            }
        }

        this.replaceWithMeaningfulChildren()
    }

    #matches(graph, context) {
        const s = this.#resolve(this.dataset.subject, context)
        const p = this.#resolve(this.dataset.predicate, context)
        const o = this.#resolve(this.dataset.object, context)
        const g = this.#resolve(this.dataset.graph, context)

        const quads = graph.match(s, p, o, g)
        const groups = this.#groups

        const groupBySubject = groups.contains("subject")
        const groupByPredicate = groups.contains("predicate")
        const groupByObject = groups.contains("object")
        const groupByGraph = groups.contains("graph")
        const noGrouping = !(groupBySubject || groupByPredicate | groupByObject | groupByGraph)

        const distinctQuads = new QuadSet()
        for (const quad of quads) {
            const ss = noGrouping || groupBySubject ? quad.subject : s
            const pp = noGrouping || groupByPredicate ? quad.predicate : p
            const oo = noGrouping || groupByObject ? quad.object : o
            const gg = noGrouping || groupByGraph ? quad.graph : g

            const q = N3.DataFactory.quad(ss, pp, oo, gg)
            distinctQuads.add(q)
        }

        return distinctQuads
    }

    #instantiate(graph, quads, template, parent, stack) {
        for (const quad of quads) {
            const isCycle = Matches.#isCycle(stack, quad)
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
                        q = Matches.#CYCLE_QUAD
                }
            }

            stack.push(q)

            for (const child of [...template.content.cloneNode(true).childNodes]) {
                parent.appendChild(child)

                if (child instanceof Element) {
                    child.initialize(graph, q, stack)
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

    #resolve(s, context) {
        if (s) {
            const x = s.match(Matches.#extractor)
            if (x) {
                if (context !== null) {
                    return context[x]
                }
            } else {
                return N3.DataFactory.namedNode(s)
            }
        }
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

customElements.define("rdf-matches", Matches)

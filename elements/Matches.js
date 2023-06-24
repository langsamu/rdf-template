import "https://unpkg.com/n3/browser/n3.min.js"
import {QuadSet} from "../QuadSet.js"
import {Templated} from "./Templated.js"

class Matches extends Templated {
    static #extractor = /(?<=^{)\w+(?=}$)/

    /**
     * @return {DOMTokenList}
     */
    get #groups() {
        const a = document.createElement("a")
        a.setAttribute("class", this.dataset.group)
        return a.classList
    }

    async initialize(graph, context, stack) {
        const distinctQuads = this.#matches(graph, context)

        await this.instantiateTemplates(graph, context, stack, distinctQuads)
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

customElements.define("rdf-matches", Matches)

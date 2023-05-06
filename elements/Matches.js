import {Quad} from "./Quad.js"
import {QuadRow} from "./QuadRow.js"
import {QuadSet} from "../QuadSet.js"
import {ContextElement} from "./ContextElement.js"

export class Matches extends ContextElement {
    static extractor = /(?<=^{)\w+(?=}$)/

    async initializedCallback() {
        const context = await this.getContext()

        const s = this.#resolve(this.dataset.subject, context)
        const p = this.#resolve(this.dataset.predicate, context)
        const o = this.#resolve(this.dataset.object, context)
        const g = this.#resolve(this.dataset.graph, context)

        const dataset = await this.getContext(true)
        const quads = dataset.match(s, p, o, g)

        const a = document.createElement("a")
        a.setAttribute("class", this.dataset.group)
        const groups = a.classList

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

        if (this.dataset.template) {
            const template = document.getElementById(this.dataset.template)
            this.instantiate(distinctQuads, template, this)
        } else {
            for (const template of this.#templates) {
                this.instantiate(distinctQuads, template, template.parentNode)
            }
        }
    }

    get cuttingStrategy() {
        if (!this.dataset.cut) {
            return Quad.DEFAULT_CUTTING_STRATEGY
        }

        if (!Quad.CUTTING_STRATEGIES.includes(this.dataset.cut)) {
            throw new Error(`Invalid cutting strategy [${this.dataset.cut}]. Allowed values: [${Quad.CUTTING_STRATEGIES}].`)
        }

        return this.dataset.cut
    }

    instantiate(quads, template, parent) {
        for (const quad of quads) {
            const quadContainer = Matches.#getContainer(template)
            quadContainer.data = quad
            quadContainer.dataset.cut = this.cuttingStrategy

            const instance = template.content.cloneNode(true)

            quadContainer.appendChild(instance)
            parent.appendChild(quadContainer)

            // for (const element of quadContainer.querySelectorAll("*")) {
            //     element.initializedCallback?.call(element)
            // }
        }
    }

    #resolve(s, context) {
        if (s) {
            const x = s.match(Matches.extractor)
            if (x) {
                return context[x]
            } else {
                return N3.DataFactory.namedNode(s)
            }
        }
    }

    /**
     * @return {Array.<HTMLTemplateElement>}
     */
    get #templates() {
        // Cache template children so instantiation does not interfere with iteration. Templates might contain nested templates.
        return [...this.getElementsByTagName("TEMPLATE")]
    }

    /**
     * @param {Node} node
     * @return {Quad | QuadRow}
     */
    static #getContainer(node) {
        if (this.#isInTable(node)) {
            return document.createElement(QuadRow.ELEMENT_NAME, {is: QuadRow.ELEMENT_IS})
        } else {
            return document.createElement(Quad.ELEMENT_NAME)
        }
    }

    /**
     * @param {Node} node
     * @return {boolean}
     */
    static #isInTable(node) {
        return ["TABLE", "THEAD", "TBODY"].includes(node.parentElement.tagName)
    }
}

customElements.define("rdf-matches", Matches)

import {RequestContextEvent} from "./RequestContextEvent.js"

export class Quad extends HTMLElement {
    static ELEMENT_NAME = "rdf-quad"
    static CYCLE_MARKER = N3.DataFactory.namedNode("urn:rdf-components:cycle-marker")
    static OBJECT_SUBJECT_CUTTING_STRATEGY = "objectToSubject"
    static SUBJECT_OBJECT_CUTTING_STRATEGY = "subjectToObject"
    static QUAD_CUTTING_STRATEGY = "quad"
    static DEFAULT_CUTTING_STRATEGY = Quad.QUAD_CUTTING_STRATEGY
    static CUTTING_STRATEGIES = [Quad.DEFAULT_CUTTING_STRATEGY, Quad.OBJECT_SUBJECT_CUTTING_STRATEGY, Quad.SUBJECT_OBJECT_CUTTING_STRATEGY]

    data

    async connectedCallback() {
        this.addEventListener(RequestContextEvent.type, this.#onRequestContext.bind(this))
        this.addEventListener("requestCycle", this.#onRequestCycle.bind(this))
    }

    async #onRequestCycle(e) {
        if (e.target === this) {
            return
        }

        if (this.#isCycle(e.detail.data)) {
            // If cycle detected then don't bubble any further and resolve with true to indicate cycle.
            e.stopPropagation()
            e.detail.resolve(true)
        }

        // Top level graph element will resolve with false to indicate no cycle.
    }

    #isCycle(otherQuad) {
        switch (this.dataset.cut) {
            case Quad.QUAD_CUTTING_STRATEGY:
                return otherQuad.subject?.id === this.data.subject?.id &&
                    otherQuad.predicate?.id === this.data.predicate?.id &&
                    otherQuad.object?.id === this.data.object?.id &&
                    otherQuad.graph?.id === this.data.graph?.id

            case Quad.OBJECT_SUBJECT_CUTTING_STRATEGY:
                return otherQuad.object?.id === this.data.subject?.id

            case Quad.SUBJECT_OBJECT_CUTTING_STRATEGY:
                return otherQuad.subject?.id === this.data.object?.id
        }
    }

    async #onRequestContext(e) {
        if (e.detail.isRoot) {
            return
        }

        e.stopPropagation()

        if (await this.#getCycle()) {
            const t = ""
            // const t = "null"
            // const t = "throw"
            if (t === "throw") {
                throw new CycleError("Cycle detected", this.data)
            } else if (t === "null") {
                e.detail.resolve()
            } else {
                e.detail.resolve(
                    N3.DataFactory.quad(
                        Quad.CYCLE_MARKER,
                        Quad.CYCLE_MARKER,
                        Quad.CYCLE_MARKER,
                        Quad.CYCLE_MARKER))
            }
        } else {
            e.detail.resolve(this.data)
        }
    }

    async #getCycle() {
        return await new Promise(resolve =>
            this.dispatchEvent(new CustomEvent("requestCycle", {
                bubbles: true,
                detail: {
                    resolve,
                    data: this.data
                }
            })))
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

customElements.define(Quad.ELEMENT_NAME, Quad)

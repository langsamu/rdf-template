import {QuadRow} from "./QuadRow.js"
import {Quad} from "./Quad.js"

export class UriNode extends HTMLElement {
    static ELEMENT_NAME = "rdf-uri-node"

    async initializedCallback() {
        console.log("UriNode initialize")
        const subject = N3.DataFactory.namedNode(this.dataset.uri)

        for (const template of this.#templates) {
            const quadContainer = UriNode.#getQuadContainer(template)
            quadContainer.data = N3.DataFactory.quad(subject, null, subject)
            quadContainer.dataset.cut = Quad.DEFAULT_CUT

            const instance = template.content.cloneNode(true)

            quadContainer.appendChild(instance)
            template.parentNode.appendChild(quadContainer)

            for (const element of quadContainer.querySelectorAll("*")) {
                element.initializedCallback?.call(element)
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
     * @return {Quad | HTMLTableRowElement}
     */
    static #getQuadContainer(node) {
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

customElements.define(UriNode.ELEMENT_NAME, UriNode)

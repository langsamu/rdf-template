import {RequestContextEvent} from "./RequestContextEvent.js"

export class QuadRow extends HTMLTableRowElement {
    static ELEMENT_IS = "tr"
    static ELEMENT_NAME = "rdf-quad-row"

    data

    async connectedCallback() {
        this.addEventListener(RequestContextEvent.type, this.#onRequestContext.bind(this))
    }

    async #onRequestContext(e) {
        if (e.target === this) {
            return
        }

        e.stopPropagation()

        e.detail.resolve(this.data)
    }

    async #getContext() {
        return await new Promise(resolve =>
            this.dispatchEvent(new CustomEvent("requestContext", {
                bubbles: true,
                detail: {
                    resolve
                }
            })))
    }
}

customElements.define(QuadRow.ELEMENT_IS, QuadRow, {extends: QuadRow.ELEMENT_NAME})

import {ContextElement} from "./ContextElement.js"

export class Value extends ContextElement {
    async initializedCallback() {
        const context = await this.getContext()
        this.innerText = context.value
    }
}

customElements.define("rdf-value", Value)

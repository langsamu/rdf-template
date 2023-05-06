import {ContextElement} from "./ContextElement.js"

export class Type extends ContextElement {
    async initializedCallback(){
        const context = await this.getContext()
        this.innerText = context.termType
    }
}

customElements.define("rdf-type", Type)

import {Replacer} from "./Replacer.js"

export class Value extends Replacer {
    getInnerText(context) {
        return context?.value
    }
}

customElements.define("rdf-value", Value)

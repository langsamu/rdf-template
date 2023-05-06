import {Replacer} from "./Replacer.js"

export class Type extends Replacer {
    getInnerText(context) {
        return context.termType
    }
}

customElements.define("rdf-type", Type)

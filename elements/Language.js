import {Replacer} from "./Replacer.js"

export class Language extends Replacer {
    getInnerText(context) {
        return context.language ?? ""
    }
}

customElements.define("rdf-language", Language)

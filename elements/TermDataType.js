import {ContextComponentAwareElement} from "./ContextComponentAwareElement.js"

export class TermDataType extends ContextComponentAwareElement {
    getContextComponent(context) {
        return context?.datatype
    }
}

customElements.define("rdf-datatype", TermDataType)

import {ContextComponent} from "./ContextComponent.js"

export class QuadSubject extends ContextComponent {
    getComponent(context) {
        return context.subject
    }
}

customElements.define("rdf-quad-subject", QuadSubject)

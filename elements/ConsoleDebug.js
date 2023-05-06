import {ContextElement} from "./ContextElement.js"

export class ConsoleDebug extends ContextElement {
    async initializedCallback() {
        const x = [await this.getContext()]

        if (this.dataset.message) {
            x.unshift(this.dataset.message)
        }

        console.debug(...x)
    }
}

customElements.define("rdf-console-debug", ConsoleDebug)

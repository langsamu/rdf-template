import {ContextAwareElement} from "./ContextAwareElement.js"

export class ConsoleGroup extends ContextAwareElement {
    async initializedCallback() {
        const x = [await this.getContext()]

        if (this.dataset.message) {
            x.unshift(this.dataset.message)
        }

        console.group(...x)
    }

    async childrenInitializedCallback() {
        console.groupEnd()
    }
}

customElements.define("rdf-console-group", ConsoleGroup)

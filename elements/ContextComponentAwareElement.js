import {ContextAwareElement} from "./ContextAwareElement.js"
import {RequestContextEvent} from "./RequestContextEvent.js"

export class ContextComponentAwareElement extends ContextAwareElement {
    async connectedCallback() {
        this.addEventListener(RequestContextEvent.type, this.#onRequestContext.bind(this))
    }

    async #onRequestContext(e) {
        // Don't interfere with own request for context
        if (e.target === this) {
            return
        }

        e.stopPropagation()

        const context = await this.getContext()
i
        const component = this.getContextComponent(context)

        e.detail.resolve(component)
    }

    getContextComponent(context) {
        throw "not implemented";
    }
}

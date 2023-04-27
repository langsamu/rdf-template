import {ContextElement} from "./ContextElement.js"
import {RequestContextEvent} from "./RequestContextEvent.js"

export class ContextComponent extends ContextElement {
    async connectedCallback() {
        this.addEventListener(RequestContextEvent.type, this.#onRequestContext.bind(this))
    }

    async #onRequestContext(e) {
        if (e.target === this) {
            return
        }

        e.stopPropagation()

        const context = await this.getContext()
        const component = this.getComponent(context)

        e.detail.resolve(component)
    }

    getComponent(context) {
        throw "not implemented";
    }
}

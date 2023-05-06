import {RequestContextEvent} from "./RequestContextEvent.js"

export class ContextAwareElement extends HTMLElement {
    async getContext(isRoot) {
        return await new Promise(resolve => this.dispatchEvent(new RequestContextEvent(resolve, isRoot)))
    }
}

import {ContextAwareElement} from "./ContextAwareElement.js"

export class Replacer extends ContextAwareElement {
    async initializedCallback() {
        this.innerText = this.getInnerText(await this.getContext())
    }

    getInnerText(param) {
        throw "not implemented";
    }
}

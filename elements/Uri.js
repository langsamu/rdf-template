import {ContextElement} from "./ContextElement.js"

export class Uri extends ContextElement {
    async initializedCallback(){
        const context = await this.getContext()
        this.innerText = context.id
    }
}

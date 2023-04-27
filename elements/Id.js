import {ContextElement} from "./ContextElement.js"

export class Id extends ContextElement {
    async initializedCallback(){
        const context = await this.getContext()
        this.innerText = context.id
    }
}

import {ContextElement} from "./ContextElement.js"

export class Language extends ContextElement {
    async initializedCallback(){
        const context = await this.getContext()
        this.innerText = context.language
    }
}

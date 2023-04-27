import {ContextComponent} from "./ContextComponent.js"

export class QuadObject extends ContextComponent {
    getComponent(context) {
        return context.object
    }
}

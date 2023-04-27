import {ContextComponent} from "./ContextComponent.js"

export class QuadGraph extends ContextComponent {
    getComponent(context) {
        return context.graph
    }
}

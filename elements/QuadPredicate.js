import {ContextComponent} from "./ContextComponent.js"

export class QuadPredicate extends ContextComponent {
    getComponent(context) {
        return context.predicate
    }
}

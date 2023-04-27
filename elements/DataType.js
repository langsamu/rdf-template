import {ContextComponent} from "./ContextComponent.js"

export class DataType extends ContextComponent {
    getComponent(context) {
        return context.datatype
    }
}

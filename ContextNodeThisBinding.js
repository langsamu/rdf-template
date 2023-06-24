export class ContextNodeThisBinding {
    #context

    constructor(context) {
        this.#context = context
    }

    get(variable) {
        if (variable.value === "this") {
            return this.#context
        }
    }
}

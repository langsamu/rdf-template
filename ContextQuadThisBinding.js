export class ContextQuadThisBinding {
    #context

    constructor(context) {
        this.#context = context
    }

    get(variable) {
        switch (variable.value) {
            case "thisSubject":
                return this.#context.subject
            case "thisPredicate":
                return this.#context.predicate
            case "thisObject":
                return this.#context.object
            case "thisGraph":
                return this.#context.graph
        }
    }
}

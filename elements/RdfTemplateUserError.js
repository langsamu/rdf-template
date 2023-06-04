export class RdfTemplateUserError extends Error {
    #graph
    #context
    #stack

    constructor(name, message, graph, context, stack) {
        super(message)
        this.name = name ?? super.name

        this.#graph = graph
        this.#context = context
        this.#stack = stack
    }

    get graph() {
        return this.#graph
    }

    get context() {
        return this.#context
    }

    get dataStack() {
        return this.#stack
    }
}

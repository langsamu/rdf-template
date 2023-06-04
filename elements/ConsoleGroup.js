export class ConsoleGroup extends HTMLElement {
    async initialize(graph, context, stack) {
        const data = [{graph, context, stack}]

        if (this.dataset.message) {
            data.unshift(this.dataset.message)
        }

        console.group(...data)

        await super.initialize(graph, context, stack)

        this.replaceWithMeaningfulChildren()

        console.groupEnd()
    }
}

customElements.define("rdf-console-group", ConsoleGroup)

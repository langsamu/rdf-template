class ConsoleDebug extends HTMLElement {
    async initialize(graph, context, stack) {
        await super.initialize(graph, context, stack)

        const data = [{graph, context, stack}]

        if (this.innerText) {
            data.unshift(this.innerText)
        }

        console.debug(...data)

        this.remove()
    }
}

customElements.define("rdf-console-debug", ConsoleDebug)

class ConsoleDebug extends HTMLElement {
    initialize(graph, context, stack) {
        super.initialize(graph, context, stack)

        const data = [{graph, context, stack}]

        if (this.innerText) {
            data.unshift(this.innerText)
        }

        console.debug(...data)

        this.remove()
    }
}

customElements.define("rdf-console-debug", ConsoleDebug)

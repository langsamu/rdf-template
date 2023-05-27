import "https://unpkg.com/n3/browser/n3.min.js"

class UriNode extends HTMLElement {
    initialize(graph, context, stack) {
        const subject = N3.DataFactory.namedNode(this.dataset.uri)
        const quad = N3.DataFactory.quad(subject, subject, subject)

        if (this.dataset.template) {
            const template = this.ownerDocument.getElementById(this.dataset.template)
            this.#instantiate(graph, quad, template, this, stack)
        } else {
            for (const template of [...this.getElementsByTagName("TEMPLATE")]) {
                this.#instantiate(graph, quad, template, template.parentNode, stack)
                template.remove()
            }
        }

        this.replaceWithMeaningfulChildren()
    }

    #instantiate(graph, quad, template, parent, stack) {
        stack.push(quad)

        for (const child of [...template.content.cloneNode(true).childNodes]) {
            parent.appendChild(child)

            if (child instanceof Element) {
                child.initialize(graph, quad, stack)
            }
        }
        stack.pop()
    }
}

customElements.define("rdf-uri-node", UriNode)

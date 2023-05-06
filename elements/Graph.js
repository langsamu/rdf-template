import {RequestContextEvent} from "./RequestContextEvent.js"

export class Graph extends HTMLElement {
    #data

    async connectedCallback() {
        this.addEventListener(RequestContextEvent.type, this.#onRequestContext.bind(this))
        this.addEventListener("requestDataset", this.#onRequestContext.bind(this))
        this.addEventListener("requestCycle", this.#onRequestCycle.bind(this))

        this.#load()

        addEventListener("DOMContentLoaded", this.#onDomContentLoaded.bind(this))
    }

    #onRequestCycle(e) {
        // If cycle request bubbled all the way up here then resolve with false to indicate no cycle.
        e.detail.resolve(false)
    }

    async #onDomContentLoaded() {
        await this.initialize(this)
        this.dispatchEvent(new CustomEvent("init"))
    }

    async initialize(element) {
        await element.initializedCallback?.call(element)

        for (const child of element.children) {
            await this.initialize(child)
        }

         await element.childrenInitializedCallback?.call(element)
    }

    #load() {
        const rdf = `
PREFIX : <urn:example:>
PREFIX acp: <http://www.w3.org/ns/solid/acp#>
PREFIX acl: <http://www.w3.org/ns/auth/acl#>

:acr1
    acp:resource :resource1 ;
    acp:accessControl :ac1 ;
    acp:memberAccessControl :ac1, :ac3 ;
    :x "X"^^:dt, []
.

:acr2
    acp:resource :resource1 ;
    acp:accessControl :ac1 ;
.

:ac1 acp:apply :p1, :p2, :p3, :p4 .

:p1
    acp:allow acl:Read, acl:Write .

:p2
    acp:allow acl:ReadX, acl:WriteY .

:p4
    acp:deny acl:ReadZ.

:matcher1
    acp:agent :agent1 .

:agent1 :x :acr1 .
`

        const dataset = new N3.Store()
        dataset.addQuads(new N3.Parser().parse(rdf))

        this.#data = dataset
    }

    #onRequestContext(e) {
        e.stopPropagation()

        e.detail.resolve(this.#data)
    }
}

customElements.define("rdf-graph", Graph)

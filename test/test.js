import "../index.js"
import {suites} from "./suites.js"

for (const {subject, tests} of suites) {
    describe(subject, withSpecs)

    function withSpecs() {
        for (const {should, input, output} of tests) {
            it(should, pass)

            async function pass() {
                await expectAsync(transformed(input)).toBeResolvedTo(output)
            }
        }
    }
}

describe("Console", () => {
        let actual

        const constant = jasmine.stringMatching("urn:example:s")
        const context = {
            asymmetricMatch: actual => "graph" in actual && "context" in actual && "stack" in actual
        }

        describe("Debug", () => {
                const emptyMarkup = `<rdf-graph>
    <script type="text/turtle"></script>
    <rdf-console-debug></rdf-console-debug>
</rdf-graph>`

                const staticMarkup = `<rdf-graph>
    <script type="text/turtle"></script>
    <rdf-console-debug>urn:example:s</rdf-console-debug>
</rdf-graph>`

                const dynamicMarkup = `<rdf-graph>
    <script type="text/turtle"><urn:example:s> <urn:example:p> <urn:example:o> .</script>
    <rdf-matches data-subject="urn:example:s">
        <template>
            <rdf-quad-subject>
                <rdf-console-debug>
                    <rdf-value></rdf-value>
                </rdf-console-debug>
            </rdf-quad-subject>
        </template>
    </rdf-matches>
</rdf-graph>`

                describe("Empty", () => withSpecs(emptyMarkup, context))
                describe("Static", () => withSpecs(staticMarkup, constant, context))
                describe("Dynamic", () => withSpecs(dynamicMarkup, constant, context))
            }
        )

        function withSpecs(input, ...spyArgs) {
            beforeAll(async () => {
                spyOn(console, "debug")
                actual = await transformed(input)
            })

            it("Output is empty", () => expect(actual).toEqual(jasmine.empty()))
            it("console.log is called with context", () => expect(console.debug).toHaveBeenCalledOnceWith(...spyArgs))
        }
    }
)

async function transformed(input) {
    const container = document.body.appendChild(document.createElement("div"))
    try {
        container.innerHTML = input

        await container.querySelector("rdf-graph").initialize()

        return container.innerHTML

    } finally {
        container.remove()
    }
}

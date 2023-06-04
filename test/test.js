import "../index.js"
import {suites} from "./suites.js"
import {RdfTemplateUserError} from "../elements/RdfTemplateUserError.js"

for (const {subject, tests} of suites) {
    describe(subject, withSpecs)

    function withSpecs() {
        for (const {should, input, output, error} of tests) {
            it(should, pass)

            async function pass() {
                if (error) {
                    await expectedFailure()
                } else {
                    await expectAsync(transformed(input)).toBeResolvedTo(output)
                }
            }

            async function expectedFailure() {
                if (!("name" in error) && !("message" in error)) {
                    fail("Neither name not message defined on expected error in suite")
                }

                try {
                    await transformed(input)

                    fail("Error wasn't thrown")

                } catch (e) {
                    expect(e).toBeInstanceOf(RdfTemplateUserError)
                    expect(e.graph).toBeDefined()
                    expect(e.context).toBeDefined()
                    expect(e.dataStack).toBeDefined()

                    if ("name" in error) {
                        expect(e.name).toBe(error.name)
                    }

                    if ("message" in error) {
                        expect(e.message).toBe(error.message)
                    }
                }
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

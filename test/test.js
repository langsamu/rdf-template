import "../index.js"
import {suites} from "./suites.js"

for (const {subject, tests} of suites) {
    describe(subject, withSpecs)

    function withSpecs() {
        for (const {should, input, output} of tests) {
            it(should, pass)

            function pass() {
                expect(transformed(input)).toEqual(output)
            }
        }
    }
}

function transformed(input) {
    const container = document.body.appendChild(document.createElement("div"))
    try {
        container.innerHTML = input

        container.querySelector("rdf-graph").initialize()

        return container.innerHTML

    } finally {
        container.remove()
    }
}

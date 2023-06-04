Element.prototype.initialize = async function (graph, context, stack) {
    for (const child of [...this.children]) {
        await child.initialize(graph, context, stack)
    }
}

const a = /^\s*$/
Element.prototype.replaceWithMeaningfulChildren = function () {
    this.replaceWith(...[...this.childNodes].filter(x => x.nodeType !== x.TEXT_NODE || !a.test(x.textContent)))
}

import "./elements/Graph.js"
import "./elements/UriNode.js"
import "./elements/TermValue.js"
import "./elements/TermType.js"
import "./elements/TermDataType.js"
import "./elements/TermLanguage.js"
import "./elements/Matches.js"
import "./elements/QuadSubject.js"
import "./elements/QuadPredicate.js"
import "./elements/QuadObject.js"
import "./elements/QuadGraph.js"
import "./elements/Attribute.js"
import "./elements/ConsoleDebug.js"
import "./elements/ConsoleGroup.js"
import "./elements/Throw.js"
import "./elements/If.js"

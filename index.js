import "https://unpkg.com/n3/browser/n3.min.js"
import {Graph} from "./elements/Graph.js"
import {UriNode} from "./elements/UriNode.js"
import {Uri} from "./elements/Uri.js"
import {Id} from "./elements/Id.js"
import {Value} from "./elements/Value.js"
import {Type} from "./elements/Type.js"
import {DataType} from "./elements/DataType.js"
import {Language} from "./elements/Language.js"
import {Matches} from "./elements/Matches.js"
import {Quad} from "./elements/Quad.js"
import {QuadRow} from "./elements/QuadRow.js"
import {QuadSubject} from "./elements/QuadSubject.js"
import {QuadPredicate} from "./elements/QuadPredicate.js"
import {QuadObject} from "./elements/QuadObject.js"
import {QuadGraph} from "./elements/QuadGraph.js"
import {Attribute} from "./elements/Attribute.js"
import {ConsoleDebug} from "./elements/ConsoleDebug.js"
import {ConsoleGroup} from "./elements/ConsoleGroup.js"

customElements.define("rdf-graph", Graph)
customElements.define("rdf-uri", Uri)
customElements.define("rdf-id", Id)
customElements.define("rdf-value", Value)
customElements.define("rdf-type", Type)
customElements.define("rdf-datatype", DataType)
customElements.define("rdf-language", Language)
customElements.define(UriNode.ELEMENT_NAME, UriNode)
customElements.define("rdf-matches", Matches)
customElements.define(Quad.ELEMENT_NAME, Quad)
customElements.define(QuadRow.ELEMENT_NAME, QuadRow, {extends: QuadRow.ELEMENT_IS})
customElements.define("rdf-quad-subject", QuadSubject)
customElements.define("rdf-quad-predicate", QuadPredicate)
customElements.define("rdf-quad-object", QuadObject)
customElements.define("rdf-quad-graph", QuadGraph)
customElements.define("rdf-attribute", Attribute)
customElements.define("rdf-console-debug", ConsoleDebug)
customElements.define("rdf-console-group", ConsoleGroup)

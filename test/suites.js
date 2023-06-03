export const suites = [
    {
        subject: "Quad terms",
        tests: [
            {
                should: "Subject",
                input: `<rdf-graph>
    <script type="text/turtle"><urn:example:g> { <urn:example:s> <urn:example:p> <urn:example:o> . }</script>
    <rdf-matches data-subject="urn:example:s">
        <template>
            <rdf-quad-subject>
                <rdf-value></rdf-value>
            </rdf-quad-subject>
        </template>
    </rdf-matches>
</rdf-graph>`,
                output: `urn:example:s`
            },
            {
                should: "Predicate",
                input: `<rdf-graph>
    <script type="text/turtle"><urn:example:g> { <urn:example:s> <urn:example:p> <urn:example:o> . }</script>
    <rdf-matches data-subject="urn:example:s">
        <template>
            <rdf-quad-predicate>
                <rdf-value></rdf-value>
            </rdf-quad-predicate>
        </template>
    </rdf-matches>
</rdf-graph>`,
                output: `urn:example:p`
            },
            {
                should: "Object",
                input: `<rdf-graph>
    <script type="text/turtle"><urn:example:g> { <urn:example:s> <urn:example:p> <urn:example:o> . }</script>
    <rdf-matches data-subject="urn:example:s">
        <template>
            <rdf-quad-object>
                <rdf-value></rdf-value>
            </rdf-quad-object>
        </template>
    </rdf-matches>
</rdf-graph>`,
                output: `urn:example:o`
            },
            {
                should: "Graph",
                input: `<rdf-graph>
    <script type="text/turtle"><urn:example:g> { <urn:example:s> <urn:example:p> <urn:example:o> . }</script>
    <rdf-matches data-subject="urn:example:s">
        <template>
            <rdf-quad-graph>
                <rdf-value></rdf-value>
            </rdf-quad-graph>
        </template>
    </rdf-matches>
</rdf-graph>`,
                output: `urn:example:g`
            },
        ]
    },
    {
        subject: "RDF*",
        tests: [
            {
                should: "Quoted triple",
                input: `<rdf-graph>
    <script type="text/turtle">
PREFIX : <urn:example:>

:g {
    :s :p << :s2 :p2 :o2 >> .
}</script>
    <rdf-matches data-subject="urn:example:s">
        <template>
            <rdf-quad-object>
                <rdf-quad-subject>
                    <rdf-value></rdf-value>
                </rdf-quad-subject>
            </rdf-quad-object>
        </template>
    </rdf-matches>
</rdf-graph>`,
                output: `urn:example:s2`
            },
        ]
    },
    {
        subject: "Term value",
        tests: [
            {
                should: "Named node",
                input: `<rdf-graph>
    <script type="text/turtle"><urn:example:g> { <urn:example:s> <urn:example:p> <urn:example:o> . }</script>
    <rdf-matches data-subject="urn:example:s">
        <template>
            <rdf-quad-object>
                <rdf-value></rdf-value>
            </rdf-quad-object>
        </template>
    </rdf-matches>
</rdf-graph>`,
                output: `urn:example:o`
            },
            {
                should: "Blank node",
                input: `<rdf-graph>
    <script type="text/turtle"><urn:example:g> { <urn:example:s> <urn:example:p> [] . }</script>
    <rdf-matches data-subject="urn:example:s">
        <template>
            <rdf-quad-object>
                <rdf-value></rdf-value>
            </rdf-quad-object>
        </template>
    </rdf-matches>
</rdf-graph>`,
                output: `n3-0`
            },
            {
                should: "Plain literal",
                input: `<rdf-graph>
    <script type="text/turtle"><urn:example:g> { <urn:example:s> <urn:example:p> "" . }</script>
    <rdf-matches data-subject="urn:example:s">
        <template>
            <rdf-quad-object>
                <rdf-value></rdf-value>
            </rdf-quad-object>
        </template>
    </rdf-matches>
</rdf-graph>`,
                output: ``
            },
            {
                should: "Language tagged string",
                input: `<rdf-graph>
    <script type="text/turtle"><urn:example:g> { <urn:example:s> <urn:example:p> ""@en . }</script>
    <rdf-matches data-subject="urn:example:s">
        <template>
            <rdf-quad-object>
                <rdf-value></rdf-value>
            </rdf-quad-object>
        </template>
    </rdf-matches>
</rdf-graph>`,
                output: ``
            },
            {
                should: "Typed literal",
                input: `<rdf-graph>
    <script type="text/turtle"><urn:example:g> { <urn:example:s> <urn:example:p> ""^^<urn:example:d> . }</script>
    <rdf-matches data-subject="urn:example:s">
        <template>
            <rdf-quad-object>
                <rdf-value></rdf-value>
            </rdf-quad-object>
        </template>
    </rdf-matches>
</rdf-graph>`,
                output: ``
            },
            {
                should: "Quoted triple",
                input: `<rdf-graph>
    <script type="text/turtle"><urn:example:s> <urn:example:p> << <urn:example:s2> <urn:example:p2> <urn:example:o3> >> .</script>
    <rdf-matches data-subject="urn:example:s">
        <template>
            <rdf-quad-object>
                <rdf-value></rdf-value>
            </rdf-quad-object>
        </template>
    </rdf-matches>
</rdf-graph>`,
                output: ``
            },
            {
                should: "Default graph",
                input: `<rdf-graph>
    <script type="text/turtle"><urn:example:s> <urn:example:p> <urn:example:o> .</script>
    <rdf-matches data-subject="urn:example:s">
        <template>
            <rdf-quad-graph>
                <rdf-value></rdf-value>
            </rdf-quad-graph>
        </template>
    </rdf-matches>
</rdf-graph>`,
                output: ``
            },
        ]
    },
    {
        subject: "Term language",
        tests: [
            {
                should: "Named node",
                input: `<rdf-graph>
    <script type="text/turtle"><urn:example:g> { <urn:example:s> <urn:example:p> <urn:example:o> . }</script>
    <rdf-matches data-subject="urn:example:s">
        <template>
            <rdf-quad-object>
                <rdf-language></rdf-language>
            </rdf-quad-object>
        </template>
    </rdf-matches>
</rdf-graph>`,
                output: ``
            },
            {
                should: "Blank node",
                input: `<rdf-graph>
    <script type="text/turtle"><urn:example:g> { <urn:example:s> <urn:example:p> [] . }</script>
    <rdf-matches data-subject="urn:example:s">
        <template>
            <rdf-quad-object>
                <rdf-language></rdf-language>
            </rdf-quad-object>
        </template>
    </rdf-matches>
</rdf-graph>`,
                output: ``
            },
            {
                should: "Plain literal",
                input: `<rdf-graph>
    <script type="text/turtle"><urn:example:g> { <urn:example:s> <urn:example:p> "" . }</script>
    <rdf-matches data-subject="urn:example:s">
        <template>
            <rdf-quad-object>
                <rdf-language></rdf-language>
            </rdf-quad-object>
        </template>
    </rdf-matches>
</rdf-graph>`,
                output: ``
            },
            {
                should: "Typed literal",
                input: `<rdf-graph>
    <script type="text/turtle"><urn:example:g> { <urn:example:s> <urn:example:p> ""^^<urn:example:d> . }</script>
    <rdf-matches data-subject="urn:example:s">
        <template>
            <rdf-quad-object>
                <rdf-language></rdf-language>
            </rdf-quad-object>
        </template>
    </rdf-matches>
</rdf-graph>`,
                output: ``
            },
            {
                should: "Language tagged string",
                input: `<rdf-graph>
    <script type="text/turtle"><urn:example:g> { <urn:example:s> <urn:example:p> ""@en . }</script>
    <rdf-matches data-subject="urn:example:s">
        <template>
            <rdf-quad-object>
                <rdf-language></rdf-language>
            </rdf-quad-object>
        </template>
    </rdf-matches>
</rdf-graph>`,
                output: `en`
            },
            {
                should: "Quoted triple",
                input: `<rdf-graph>
    <script type="text/turtle"><urn:example:s> <urn:example:p> << <urn:example:s2> <urn:example:p2> <urn:example:o3> >> .</script>
    <rdf-matches data-subject="urn:example:s">
        <template>
            <rdf-quad-object>
                <rdf-language></rdf-language>
            </rdf-quad-object>
        </template>
    </rdf-matches>
</rdf-graph>`,
                output: ``
            },
            {
                should: "Default graph",
                input: `<rdf-graph>
    <script type="text/turtle"><urn:example:s> <urn:example:p> <urn:example:o> .</script>
    <rdf-matches data-subject="urn:example:s">
        <template>
            <rdf-quad-graph>
                <rdf-language></rdf-language>
            </rdf-quad-graph>
        </template>
    </rdf-matches>
</rdf-graph>`,
                output: ``
            },
        ]
    },
    {
        subject: "Term type",
        tests: [
            {
                should: "Named node",
                input: `<rdf-graph>
    <script type="text/turtle"><urn:example:s> <urn:example:p> <urn:example:o> .</script>
    <rdf-matches data-subject="urn:example:s">
        <template>
            <rdf-quad-object>
                <rdf-type></rdf-type>
            </rdf-quad-object>
        </template>
    </rdf-matches>
</rdf-graph>`,
                output: `NamedNode`
            },
            {
                should: "Blank node",
                input: `<rdf-graph>
    <script type="text/turtle"><urn:example:s> <urn:example:p> [] .</script>
    <rdf-matches data-subject="urn:example:s">
        <template>
            <rdf-quad-object>
                <rdf-type></rdf-type>
            </rdf-quad-object>
        </template>
    </rdf-matches>
</rdf-graph>`,
                output: `BlankNode`
            },
            {
                should: "Plain literal",
                input: `<rdf-graph>
    <script type="text/turtle"><urn:example:s> <urn:example:p> "" .</script>
    <rdf-matches data-subject="urn:example:s">
        <template>
            <rdf-quad-object>
                <rdf-type></rdf-type>
            </rdf-quad-object>
        </template>
    </rdf-matches>
</rdf-graph>`,
                output: `Literal`
            },
            {
                should: "Typed literal",
                input: `<rdf-graph>
    <script type="text/turtle"><urn:example:s> <urn:example:p> ""^^<urn:example:d> .</script>
    <rdf-matches data-subject="urn:example:s">
        <template>
            <rdf-quad-object>
                <rdf-type></rdf-type>
            </rdf-quad-object>
        </template>
    </rdf-matches>
</rdf-graph>`,
                output: `Literal`
            },
            {
                should: "Language tagged string",
                input: `<rdf-graph>
    <script type="text/turtle"><urn:example:s> <urn:example:p> ""@en .</script>
    <rdf-matches data-subject="urn:example:s">
        <template>
            <rdf-quad-object>
                <rdf-type></rdf-type>
            </rdf-quad-object>
        </template>
    </rdf-matches>
</rdf-graph>`,
                output: `Literal`
            },
            {
                should: "Quoted triple",
                input: `<rdf-graph>
    <script type="text/turtle"><urn:example:s> <urn:example:p> << <urn:example:s2> <urn:example:p2> <urn:example:o3> >> .</script>
    <rdf-matches data-subject="urn:example:s">
        <template>
            <rdf-quad-object>
                <rdf-type></rdf-type>
            </rdf-quad-object>
        </template>
    </rdf-matches>
</rdf-graph>`,
                output: `Quad`
            },
            {
                should: "Default graph",
                input: `<rdf-graph>
    <script type="text/turtle"><urn:example:s> <urn:example:p> <urn:example:o> .</script>
    <rdf-matches data-subject="urn:example:s">
        <template>
            <rdf-quad-graph>
                <rdf-type></rdf-type>
            </rdf-quad-graph>
        </template>
    </rdf-matches>
</rdf-graph>`,
                output: `DefaultGraph`
            },
        ]
    },
    {
        subject: "Term datatype",
        tests: [
            {
                should: "Named node",
                input: `<rdf-graph>
    <script type="text/turtle"><urn:example:s> <urn:example:p> <urn:example:o> .</script>
    <rdf-matches data-subject="urn:example:s">
        <template>
            <rdf-quad-object>
                <rdf-datatype>
                    <rdf-value></rdf-value>
                </rdf-datatype>
            </rdf-quad-object>
        </template>
    </rdf-matches>
</rdf-graph>`,
                output: ``
            },
            {
                should: "Blank node",
                input: `<rdf-graph>
    <script type="text/turtle"><urn:example:s> <urn:example:p> [] .</script>
    <rdf-matches data-subject="urn:example:s">
        <template>
            <rdf-quad-object>
                <rdf-datatype>
                    <rdf-value></rdf-value>
                </rdf-datatype>
            </rdf-quad-object>
        </template>
    </rdf-matches>
</rdf-graph>`,
                output: ``
            },
            {
                should: "Plain literal",
                input: `<rdf-graph>
    <script type="text/turtle"><urn:example:s> <urn:example:p> "" .</script>
    <rdf-matches data-subject="urn:example:s">
        <template>
            <rdf-quad-object>
                <rdf-datatype>
                    <rdf-value></rdf-value>
                </rdf-datatype>
            </rdf-quad-object>
        </template>
    </rdf-matches>
</rdf-graph>`,
                output: `http://www.w3.org/2001/XMLSchema#string`
            },
            {
                should: "Typed literal",
                input: `<rdf-graph>
    <script type="text/turtle"><urn:example:s> <urn:example:p> ""^^<urn:example:d> .</script>
    <rdf-matches data-subject="urn:example:s">
        <template>
            <rdf-quad-object>
                <rdf-datatype>
                    <rdf-value></rdf-value>
                </rdf-datatype>
            </rdf-quad-object>
        </template>
    </rdf-matches>
</rdf-graph>`,
                output: `urn:example:d`
            },
            {
                should: "Language tagged string",
                input: `<rdf-graph>
    <script type="text/turtle"><urn:example:s> <urn:example:p> ""@en .</script>
    <rdf-matches data-subject="urn:example:s">
        <template>
            <rdf-quad-object>
                <rdf-datatype>
                    <rdf-value></rdf-value>
                </rdf-datatype>
            </rdf-quad-object>
        </template>
    </rdf-matches>
</rdf-graph>`,
                output: `http://www.w3.org/1999/02/22-rdf-syntax-ns#langString`
            },
            {
                should: "Quoted triple",
                input: `<rdf-graph>
    <script type="text/turtle"><urn:example:s> <urn:example:p> << <urn:example:s2> <urn:example:p2> <urn:example:o3> >> .</script>
    <rdf-matches data-subject="urn:example:s">
        <template>
            <rdf-quad-object>
                <rdf-datatype>
                    <rdf-value></rdf-value>
                </rdf-datatype>
            </rdf-quad-object>
        </template>
    </rdf-matches>
</rdf-graph>`,
                output: ``
            },
            {
                should: "Default graph",
                input: `<rdf-graph>
    <script type="text/turtle"><urn:example:s> <urn:example:p> <urn:example:o> .</script>
    <rdf-matches data-subject="urn:example:s">
        <template>
            <rdf-quad-graph>
                <rdf-datatype>
                    <rdf-value></rdf-value>
                </rdf-datatype>
            </rdf-quad-graph>
        </template>
    </rdf-matches>
</rdf-graph>`,
                output: ``
            },
        ]
    },
    {
        subject: "Attribute",
        tests: [
            {
                should: "With name",
                input: `<rdf-graph>
    <script type="text/turtle"><urn:example:s> <urn:example:p> <urn:example:o> .</script>
    <rdf-matches data-subject="urn:example:s">
        <div>
            <template>
                <rdf-attribute data-name="data-subject">
                    <rdf-quad-subject>
                        <rdf-value></rdf-value>
                    </rdf-quad-subject>
                </rdf-attribute>
            </template>
        </div>
    </rdf-matches>
</rdf-graph>`,
                output: `<div data-subject="urn:example:s">
            
        
                
            </div>`
            },
            {
                should: "Without name",
                input: `<rdf-graph>
    <script type="text/turtle"><urn:example:s> <urn:example:p> <urn:example:o> .</script>
    <rdf-matches data-subject="urn:example:s">
        <div>
            <template>
                <rdf-attribute>
                    <rdf-quad-subject>
                        <rdf-value></rdf-value>
                    </rdf-quad-subject>
                </rdf-attribute>
            </template>
        </div>
    </rdf-matches>
</rdf-graph>`,
                output: `<div>
            
        
                
            </div>`
            }
        ]
    },
    {
        subject: "Console",
        tests: [
            {
                should: "Group",
                input: `<rdf-graph>
    <script type="text/turtle"><urn:example:s> <urn:example:p> ""^^<urn:example:d> .</script>
    <rdf-console-group data-message="above matches">
        <rdf-matches data-subject="urn:example:s">
            <template>
                <rdf-console-group data-message="above object">
                    <rdf-quad-object>
                        <rdf-console-group data-message="above datatype">
                            <rdf-datatype>
                                <rdf-console-group data-message="above value">
                                    <rdf-value></rdf-value>
                                </rdf-console-group>
                            </rdf-datatype>
                        </rdf-console-group>
                    </rdf-quad-object>
                </rdf-console-group>
            </template>
        </rdf-matches>
    </rdf-console-group>
</rdf-graph>`,
                output: `urn:example:d`
            },
        ]
    },
]

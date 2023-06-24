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
    {
        subject: "Throw",
        tests: [
            {
                should: "Empty",
                input: `<rdf-graph>
    <script type="text/turtle">[a 0] .</script>
    <rdf-throw></rdf-throw>
</rdf-graph>`,
                error: {name: "Error", message: ""}
            },
            {
                should: "Message",
                input: `<rdf-graph>
    <script type="text/turtle">[a 0] .</script>
    <rdf-throw data-message="MESSAGE"></rdf-throw>
</rdf-graph>`,
                error: {name: "Error", message: "MESSAGE"}
            },
            {
                should: "Name",
                input: `<rdf-graph>
    <script type="text/turtle">[a 0] .</script>
    <rdf-throw data-name="NAME"></rdf-throw>
</rdf-graph>`,
                error: {name: "NAME", message: ""}
            },
            {
                should: "Name & message",
                input: `<rdf-graph>
    <script type="text/turtle">[a 0] .</script>
    <rdf-throw data-name="NAME" data-message="MESSAGE"></rdf-throw>
</rdf-graph>`,
                error: {name: "NAME", message: "MESSAGE"}
            },
        ]
    },
    {
        subject: "If",
        tests: [
            {
                should: "False",
                input: `<rdf-graph>
    <script type="text/turtle"><urn:example:s> <urn:example:p> <urn:example:o> .</script>
    <rdf-if>
        <script type="application/sparql-query">
ASK {
    [ a [] ] .
}
        </script>
        <template>
            <span>no</span>
        </template>
    </rdf-if>
</rdf-graph>`,
                output: ``
            },
            {
                should: "True",
                input: `<rdf-graph>
    <script type="text/turtle"><urn:example:s> <urn:example:s> <urn:example:s> .</script>
    <rdf-if>
        <script type="application/sparql-query">
ASK {
    ?s ?p ?o
}
        </script>
        <template>
            <span>yes</span>
        </template>
    </rdf-if>
</rdf-graph>`,
                output: `<span>yes</span>`
            },
            {
                should: "False not evaluated",
                input: `<rdf-graph>
    <script type="text/turtle"><urn:example:s> <urn:example:s> <urn:example:s> .</script>
    <rdf-if>
        <script type="application/sparql-query">
ASK {
    [ a [] ] .
}
        </script>
        <template>
            <rdf-throw data-message="This should not be thrown"></rdf-throw>
        </template>
    </rdf-if>
</rdf-graph>`,
                output: ``
            },
            {
                should: "Script evaluated",
                input: `<rdf-graph>
    <script type="text/turtle"><urn:example:s> <urn:example:s> "ask {}" .</script>
    <rdf-if>
        <rdf-element data-name="script">
            <rdf-attribute data-name="type">application/sparql-query</rdf-attribute>
            <rdf-matches data-subject="urn:example:s">
                <template>
                    <rdf-quad-object>
                        <rdf-value></rdf-value>
                    </rdf-quad-object>
                </template>
            </rdf-matches>
        </rdf-element>
        <template>
            <span>yes</span>
        </template>
    </rdf-if>
</rdf-graph>`,
                output: `<span>yes</span>`
            },
            {
                should: "$this nothing",
                input: `<rdf-graph>
    <script type="text/turtle"><urn:example:s> a 0 .</script>
    <rdf-if>
        <script type="application/sparql-query">
            ASK {
                $this a 0 . # $this is not bound 
            }
        </script>
        <template>
            <span>yes</span>
        </template>
    </rdf-if>
</rdf-graph>`,
                output: `<span>yes</span>`
            },
            {
                should: "$this quad",
                input: `<rdf-graph>
    <script type="text/turtle"><urn:example:s> a 0 .</script>
    <rdf-matches>
        <template>
            <rdf-if>
                <script type="application/sparql-query">
                    ASK {
                        $this a 0 . # $this is not bound 
                    }
                </script>
                <template>
                    <span>yes</span>
                </template>
            </rdf-if>
        </template>
    </rdf-matches>
</rdf-graph>`,
                output: `<span>yes</span>`
            },
            {
                should: "$this node true",
                input: `<rdf-graph>
    <script type="text/turtle"><urn:example:s> a 0 .</script>
    <rdf-matches data-subject="urn:example:s">
        <template>
            <rdf-quad-subject>
                <rdf-if>
                    <script type="application/sparql-query">ASK { $this a 0 . }</script>
                    <template>
                        <span>yes</span>
                    </template>
                </rdf-if>
            </rdf-quad-subject>
        </template>    
    </rdf-matches>  
</rdf-graph>`,
                output: `<span>yes</span>`
            },
            {
                should: "$this node false",
                input: `<rdf-graph>
    <script type="text/turtle"><urn:example:s> a "not zero" .</script>
    <rdf-matches data-subject="urn:example:s">
        <template>
            <rdf-quad-subject>
                <rdf-if>
                    <script type="application/sparql-query">ASK { $this a 0 . }</script>
                    <template>
                        <span>yes</span>
                    </template>
                </rdf-if>
            </rdf-quad-subject>
        </template>    
    </rdf-matches>  
</rdf-graph>`,
                output: ``
            },
            {
                should: "$thisSubject nothing",
                input: `<rdf-graph>
    <script type="text/turtle"><urn:example:s> a 0 .</script>
    <rdf-if>
        <script type="application/sparql-query">
            ASK {
                $thisSubject a 0 . # $thisSubject not bound
            }
        </script>
        <template>
            <span>yes</span>
        </template>
    </rdf-if>
</rdf-graph>`,
                output: `<span>yes</span>`
            },
            {
                should: "$thisSubject node",
                input: `<rdf-graph>
    <script type="text/turtle"><urn:example:s> a 0 .</script>
    <rdf-matches>
        <template>
            <rdf-quad-object>
                <rdf-if>
                    <script type="application/sparql-query">
                        ASK {
                            $thisSubject a 0 . # $thisSubject not bound
                        }
                    </script>
                    <template>
                        <span>yes</span>
                    </template>
                </rdf-if>
            </rdf-quad-object>
        </template>    
    </rdf-matches>  
</rdf-graph>`,
                output: `<span>yes</span>`
            },
            {
                should: "$thisSubject quad true",
                input: `<rdf-graph>
    <script type="text/turtle"><urn:example:s> a 0 .</script>
    <rdf-matches>
        <template>
            <rdf-if>
                <script type="application/sparql-query">ASK { $thisSubject a 0 . }</script>
                <template>
                    <span>yes</span>
                </template>
            </rdf-if>
        </template>    
    </rdf-matches>  
</rdf-graph>`,
                output: `<span>yes</span>`
            },
            {
                should: "$thisSubject quad false",
                input: `<rdf-graph>
    <script type="text/turtle"><urn:example:s> a 1 .</script>
    <rdf-matches>
        <template>
            <rdf-if>
                <script type="application/sparql-query">ASK { $thisSubject a 0 . }</script>
                <template>
                    <span>yes</span>
                </template>
            </rdf-if>
        </template>    
    </rdf-matches>  
</rdf-graph>`,
                output: ``
            },
            {
                should: "$thisPredicate nothing",
                input: `<rdf-graph>
    <script type="text/turtle"><urn:example:s> a 0 .</script>
    <rdf-if>
        <script type="application/sparql-query">
            ASK {
                $thisPredicate a 0 . # $thisPredicate not bound
            }
        </script>
        <template>
            <span>yes</span>
        </template>
    </rdf-if>
</rdf-graph>`,
                output: `<span>yes</span>`
            },
            {
                should: "$thisPredicate node",
                input: `<rdf-graph>
    <script type="text/turtle"><urn:example:s> a 0 .</script>
    <rdf-matches>
        <template>
            <rdf-quad-object>
                <rdf-if>
                    <script type="application/sparql-query">
                        ASK {
                            $thisPredicate a 0 . # $thisSubject not bound
                        }
                    </script>
                    <template>
                        <span>yes</span>
                    </template>
                </rdf-if>
            </rdf-quad-object>
        </template>    
    </rdf-matches>  
</rdf-graph>`,
                output: `<span>yes</span>`
            },
            {
                should: "$thisPredicate quad true",
                input: `<rdf-graph>
    <script type="text/turtle"><urn:example:s> a 0 .</script>
    <rdf-matches>
        <template>
            <rdf-if>
                <script type="application/sparql-query">ASK { <urn:example:s> $thisPredicate 0 . }</script>
                <template>
                    <span>yes</span>
                </template>
            </rdf-if>
        </template>    
    </rdf-matches>  
</rdf-graph>`,
                output: `<span>yes</span>`
            },
            {
                should: "$thisPredicate quad false",
                input: `<rdf-graph>
    <script type="text/turtle"><urn:example:s> a 1 .</script>
    <rdf-matches>
        <template>
            <rdf-if>
                <script type="application/sparql-query">ASK { <urn:example:s> $thisPredicate 0 . }</script>
                <template>
                    <span>yes</span>
                </template>
            </rdf-if>
        </template>    
    </rdf-matches>  
</rdf-graph>`,
                output: ``
            },
            {
                should: "$thisObject nothing",
                input: `<rdf-graph>
    <script type="text/turtle"><urn:example:s> a 0 .</script>
    <rdf-if>
        <script type="application/sparql-query">
            ASK {
                $thisObject a 0 . # $thisObject not bound
            }
        </script>
        <template>
            <span>yes</span>
        </template>
    </rdf-if>
</rdf-graph>`,
                output: `<span>yes</span>`
            },
            {
                should: "$thisObject node",
                input: `<rdf-graph>
    <script type="text/turtle"><urn:example:s> a 0 .</script>
    <rdf-matches>
        <template>
            <rdf-quad-object>
                <rdf-if>
                    <script type="application/sparql-query">
                        ASK {
                            $thisObject a 0 . # $thisObject not bound
                        }
                    </script>
                    <template>
                        <span>yes</span>
                    </template>
                </rdf-if>
            </rdf-quad-object>
        </template>    
    </rdf-matches>  
</rdf-graph>`,
                output: `<span>yes</span>`
            },
            {
                should: "$thisObject quad true",
                input: `<rdf-graph>
    <script type="text/turtle"><urn:example:s> a 0 .</script>
    <rdf-matches>
        <template>
            <rdf-if>
                <script type="application/sparql-query">ASK { <urn:example:s> a $thisObject . }</script>
                <template>
                    <span>yes</span>
                </template>
            </rdf-if>
        </template>    
    </rdf-matches>  
</rdf-graph>`,
                output: `<span>yes</span>`
            },
            {
                should: "$thisSubject quad false",
                input: `<rdf-graph>
    <script type="text/turtle"><urn:example:s> a 0 .</script>
    <rdf-matches>
        <template>
            <rdf-if>
                <script type="application/sparql-query">ASK { <urn:example:bogus> a $thisObject . }</script>
                <template>
                    <span>yes</span>
                </template>
            </rdf-if>
        </template>    
    </rdf-matches>  
</rdf-graph>`,
                output: ``
            },
            {
                should: "$thisGraph nothing",
                input: `<rdf-graph>
    <script type="text/turtle"><urn:example:s> a 0 .</script>
    <rdf-if>
        <script type="application/sparql-query">
            ASK {
                $thisGraph a 0 . # $thisGraph not bound
            }
        </script>
        <template>
            <span>yes</span>
        </template>
    </rdf-if>
</rdf-graph>`,
                output: `<span>yes</span>`
            },
            {
                should: "$thisGraph node",
                input: `<rdf-graph>
    <script type="text/turtle"><urn:example:s> a 0 .</script>
    <rdf-matches>
        <template>
            <rdf-quad-object>
                <rdf-if>
                    <script type="application/sparql-query">
                        ASK {
                            $thisGraph a 0 . # $thisGraph not bound
                        }
                    </script>
                    <template>
                        <span>yes</span>
                    </template>
                </rdf-if>
            </rdf-quad-object>
        </template>    
    </rdf-matches>  
</rdf-graph>`,
                output: `<span>yes</span>`
            },
            {
                should: "$thisGraph quad true",
                input: `<rdf-graph>
    <script type="text/turtle"><urn:example:g> { <urn:example:g> a 0 . }</script>
    <rdf-matches>
        <template>
            <rdf-if>
                <script type="application/sparql-query">ASK { GRAPH $thisGraph { $thisGraph a 0 . } }</script>
                <template>
                    <span>yes</span>
                </template>
            </rdf-if>
        </template>    
    </rdf-matches>  
</rdf-graph>`,
                output: `<span>yes</span>`
            },
            {
                should: "$thisGraph quad false",
                input: `<rdf-graph>
    <script type="text/turtle"><urn:example:g> { <urn:example:g> a 1 . }</script>
    <rdf-matches>
        <template>
            <rdf-if>
                <script type="application/sparql-query">ASK { GRAPH $thisGraph { ?thisGraph a 0 . } }</script>
                <template>
                    <span>yes</span>
                </template>
            </rdf-if>
        </template>    
    </rdf-matches>  
</rdf-graph>`,
                output: ``
            },
        ]
    },
    {
        subject: "Element",
        tests: [
            {
                should: "No name",
                input: `<rdf-graph>
    <script type="text/turtle"><urn:example:s> <urn:example:p> <urn:example:o> .</script>
    <rdf-element></rdf-element>
</rdf-graph>`,
                output: ``
            },
            {
                should: "Simple",
                input: `<rdf-graph>
    <script type="text/turtle"><urn:example:s> <urn:example:p> <urn:example:o> .</script>
    <rdf-element data-name="b"></rdf-element>
</rdf-graph>`,
                output: `<b></b>`
            },
            {
                should: "Namespace",
                input: `<rdf-graph>
    <script type="text/turtle"><urn:example:s> <urn:example:p> <urn:example:o> .</script>
    <rdf-element data-name="b" data-namespace="x"></rdf-element>
</rdf-graph>`,
                output: `<b></b>`
            },
            {
                should: "Is",
                input: `<rdf-graph>
    <script type="text/turtle"><urn:example:s> <urn:example:p> <urn:example:o> .</script>
    <rdf-element data-name="div" data-is="test-test">xxx</rdf-element>
</rdf-graph>`,
                output: `<div is="test-test">set by custom element</div>`
            },
            {
                should: "Data-driven",
                input: `<rdf-graph>
    <script type="text/turtle">
<urn:example:s>
    <urn:example:title> "title1" ;
    <urn:example:body> "body1" ;
.
</script>
   <rdf-element data-name="p">
        <rdf-attribute data-name="title">
            <rdf-matches data-subject="{subject}" data-predicate="urn:example:title">
                <template>
                    <rdf-quad-object>
                        <rdf-value></rdf-value>
                    </rdf-quad-object>
                </template>
            </rdf-matches>
        </rdf-attribute>
        <rdf-matches data-subject="{subject}" data-predicate="urn:example:body">
            <template>
                <rdf-quad-object>
                    <rdf-value></rdf-value>
                </rdf-quad-object>
            </template>
        </rdf-matches>
    </rdf-element>
</rdf-graph>`,
                output: `<p title="title1">
        
        body1
    </p>`
            },
            {
                should: "SVG",
                input: `<rdf-graph>
    <script type="text/turtle">
<urn:example:s>
    <urn:example:cx> 150 ;
    <urn:example:cy> 75 ;
    <urn:example:r> 50 ;
.
</script>
    <rdf-element data-name="svg" data-namespace="http://www.w3.org/2000/svg">
        <rdf-element data-name="circle" data-namespace="http://www.w3.org/2000/svg">
            <rdf-attribute data-name="cx">
                <rdf-matches data-subject="urn:example:s" data-predicate="urn:example:cx">
                    <template>
                        <rdf-quad-object>
                            <rdf-value></rdf-value>
                        </rdf-quad-object>
                    </template>
                </rdf-matches>
            </rdf-attribute>
            <rdf-attribute data-name="cy">
                <rdf-matches data-subject="urn:example:s" data-predicate="urn:example:cy">
                    <template>
                        <rdf-quad-object>
                            <rdf-value></rdf-value>
                        </rdf-quad-object>
                    </template>
                </rdf-matches>
            </rdf-attribute>
            <rdf-attribute data-name="r">
                <rdf-matches data-subject="urn:example:s" data-predicate="urn:example:r">
                    <template>
                        <rdf-quad-object>
                            <rdf-value></rdf-value>
                        </rdf-quad-object>
                    </template>
                </rdf-matches>
            </rdf-attribute>
        </rdf-element>
    </rdf-element>
</rdf-graph>`,
                output: `<svg>
        <circle cx="150" cy="75" r="50">
            
            
            
        </circle>
    </svg>`
            },
        ]
    },
    {
        subject: "Construct",
        tests: [
            {
                should: "x",
                input: `<rdf-graph>
    <script type="text/turtle"><urn:example:s> <urn:example:p> 0, 1 .</script>
    <rdf-construct>
        <script type="application/sparql-query">CONSTRUCT { ?s ?p ?o .} WHERE { ?s ?p ?o . }</script>
        <table>
            <template>
                <tr>
                    <td>
                        <rdf-quad-subject>
                            <rdf-value></rdf-value>
                        </rdf-quad-subject>
                    </td>
                    <td>
                        <rdf-quad-predicate>
                            <rdf-value></rdf-value>
                        </rdf-quad-predicate>
                    </td>
                    <td>
                        <rdf-quad-object>
                            <rdf-value></rdf-value>
                        </rdf-quad-object>
                    </td>
                </tr>
            </template>
        </table>
    </rdf-construct>
</rdf-graph>`,
                output: `<table>
            
        
                <tr>
                    <td>
                        urn:example:s
                    </td>
                    <td>
                        urn:example:p
                    </td>
                    <td>
                        0
                    </td>
                </tr>
            
                <tr>
                    <td>
                        urn:example:s
                    </td>
                    <td>
                        urn:example:p
                    </td>
                    <td>
                        1
                    </td>
                </tr>
            </table>`
            },
        ]
    },
    {
        subject: "Select",
        tests: [
            {
                should: "x",
                input: `<rdf-graph>
    <script type="text/turtle"><urn:example:s> <urn:example:p> 0, 1 .</script>
    <rdf-select>
        <script type="application/sparql-query">SELECT ?s ?p ?o WHERE { ?s ?p ?o . }</script>
        <table>
            <template>
                <tr>
                    <td>
                        <rdf-binding data-name="s">
                            <rdf-value></rdf-value>
                        </rdf-binding>
                    </td>
                    <td>
                        <rdf-binding data-name="p">
                            <rdf-value></rdf-value>
                        </rdf-binding>
                    </td>
                    <td>
                        <rdf-binding data-name="o">
                            <rdf-value></rdf-value>
                        </rdf-binding>
                    </td>
                </tr>
            </template>
        </table>
    </rdf-select>
</rdf-graph>`,
                output: `<table>
            
        
                <tr>
                    <td>
                        urn:example:s
                    </td>
                    <td>
                        urn:example:p
                    </td>
                    <td>
                        0
                    </td>
                </tr>
            
                <tr>
                    <td>
                        urn:example:s
                    </td>
                    <td>
                        urn:example:p
                    </td>
                    <td>
                        1
                    </td>
                </tr>
            </table>`
            },
        ]
    },
]

customElements.define("test-test", class extends HTMLDivElement {
    connectedCallback() {
        this.innerText = "set by custom element"
    }
}, {extends: "div"})

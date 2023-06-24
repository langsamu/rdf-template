await new Promise(resolve => {
    if ("Comunica" in window) {
        resolve()
    }

    const comunica = document.createElement("script")
    comunica.setAttribute("src", "https://rdf.js.org/comunica-browser/versions/v2/engines/query-sparql-rdfjs/comunica-browser.js")
    comunica.addEventListener("load", resolve)
    document.head.appendChild(comunica)
})

export const Comunica = window.Comunica

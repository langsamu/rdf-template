export class Attribute extends HTMLElement {
    childrenInitializedCallback() {
        this.parentElement.setAttribute(this.dataset.name, this.innerText)

        this.remove()
    }
}

export class QuadSet extends Set {
    #index = new Map

    add(value) {
        if (!this.#index.has(QuadSet.#asString(value))) {
            this.#index.set(QuadSet.#asString(value), value)
        }

        return this
    }

    clear() {
        this.#index.clear()
    }

    delete(value) {
        if (!value) {
            return false
        }

        return this.index.delete(QuadSet.#asString(value))
    }

    forEach(callback, thisArg) {
        this.values().forEach(callback, thisArg)
    }

    has(value) {
        return this.#index.has(QuadSet.#asString(value))
    }

    get size() {
        return this.#index.size
    }

    [Symbol.iterator]() {
        return this.values()[Symbol.iterator]()
    }

    entries() {
        return this.values().entries()
    }

    keys() {
        this.values()
    }

    values() {
        return this.#index.values()
    }

    get [Symbol.toStringTag]() {
        return "QuadSet"
    }

    static #asString(quad) {
        return `${quad.subject?.value}-${quad.predicate?.value}-${quad.object?.value}-${quad.graph?.value}`
    }
}

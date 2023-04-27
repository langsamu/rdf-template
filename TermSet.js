export class TermSet extends Set {
    #index = new Map

    add(value) {
        if (!this.#index.has(value.id)) {
            this.#index.set(value.id, value)
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

        return this.index.delete(value.id)
    }

    forEach(callback, thisArg) {
        this.values().forEach(callback, thisArg)
    }

    has(value) {
        return this.#index.has(value.id)
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
        return "TermSet"
    }
}

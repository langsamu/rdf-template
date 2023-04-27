export class RequestContextEvent extends CustomEvent {
    static type = "requestContext"

    constructor(resolve, isRoot) {
        super(RequestContextEvent.type, {bubbles: true, detail: {resolve, isRoot}});
    }
}

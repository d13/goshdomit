export function on(element, type, listener, thisArg, capture) {
    capture || (capture = false);

    if (thisArg) {
        listener = listener.bind(thisArg);
    }

    element.addEventListener(type, listener, capture);

    return {
        off: function() {
            element.removeEventListener(type, listener, capture);
        }
    };

}

export function delegate(element, type, selector, listener, thisArg, capture) {

    if (thisArg) {
        listener = listener.bind(thisArg);
    }

    let delegateListener = function(e) {
        if (e.target && e.target.matches(selector)) {
            listener(e);
        }
    };

    return on(element, type, delegateListener, thisArg, capture);
}
export function toArray(els) {
    if (Array.isArray(els)) {
        return els;
    }

    if (els instanceof NodeList) {
        return Array.prototype.slice.call(els);
    }

    // assuming single dom element
    return [ els ];
}
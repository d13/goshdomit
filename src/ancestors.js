export function findParent(element, lookupFn) {
    let parentEl = element.parentElement;
    if (!parentEl) return false;
    if (lookupFn(parentEl)) return true;

    return findParent(parentEl, lookupFn);
}

export function findParentAll(element, lookupFn) {
    let parentEl = element.parentElement;
    if (!parentEl) return [];

    let matches = [];
    while(parentEl) {
        if (lookupFn(parentEl)) {
            matches.push(parentEl);
        }
        parentEl = element.parentElement;
    }

    return matches;
}

export function queryParent(element, selector) {
    return findParent(element, el => {
        return el.matches(selector);
    });
}

export function queryParentAll(element, selector) {
    return findParentAll(element, el => {
        return el.matches(selector);
    });
}
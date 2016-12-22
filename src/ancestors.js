export function findParent(element, lookupFn) {
    let parentEl = element.parentElement;
    if (!parentEl) return;
    if (lookupFn(parentEl)) return parentEl;

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

let matchSelector = el => el.matches(selector);

export function queryParent(element, selector) {
    return findParent(element, matchSelector);
}

export function queryParentAll(element, selector) {
    return findParentAll(element, matchSelector);
}
import * as Elements from './elements';

let hasClass, addClassCore, removeClassCore;
if (!('classList' in document.documentElement)) {
    hasClass = function(el, name) {
        let className = el.className;
        if (!className) return false;

        let regName = new RegExp('\\b' + name + '\\b','g');
        return regName.test(className);
    };

    addClassCore = function(el, name) {
        if (!hasClass.apply(this, arguments)) {
            el.className += ' ' + name;
        }
    };

    removeClassCore = function(el, name) {
        if (hasClass.apply(this, arguments)) {
            let regName = new RegExp('\\b' + name + '\\b', 'g');
            el.className = el.className.replace(regName, ' ');
        }
    };
} else {
    hasClass = function(el, name) {
        return el.classList.contains(name);
    };

    addClassCore = function(el, name) {
        el.classList.add(name);
    };

    removeClassCore = function(el, name) {
        el.classList.remove(name);
    };
}

function normalizeClasses(classes) {
    if (Array.isArray(classes)) {
        return classes;
    }

    return classes.split(' ');
}

function forEachElementAndClass(els, classes, fn) {
    if (!fn) return;

    let classList = normalizeClasses(classes);
    Elements.toArray(els).forEach(el => {
        classList.forEach(cls => {
            fn.call(this, el, cls);
        });
    });
}

export function toggleClass(el, name, force) {
    if (force === undefined) {
        force = !hasClass.call(this, el, name);
    }
    // Bool param in classList.toggle isn't supported in all browsers
    // so just using addClassCore/removeClassCore
    if (force) {
        addClassCore.call(this, el, name);
    } else {
        removeClassCore.call(this, el, name);
    }
}

export function addClass(els, classes) {
    forEachElementAndClass(els, classes, (el, cls) => {
        addClassCore(el, cls);
    });
}

export function removeClass(els, classes) {
    forEachElementAndClass(els, classes, (el, cls) => {
        removeClassCore(el, cls);
    });
}

export { hasClass };

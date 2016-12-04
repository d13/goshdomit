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

function normalizeEls(els) {
    if (Array.isArray(els)) {
        return els;
    }

    //FIXME: lame nodeList detect
    if (els.length) {
        return Array.prototype.slice.call(els);
    }

    // assuming single dom element
    return [ els ];
}

function normalizeClasses(classes) {
    if (Array.isArray(classes)) {
        return classes;
    }

    if (classes.indexOf(' ') > -1) {
        return classes.split(' ');
    }

    return [ classes ];
}

function forEachElementAndClass(els, classes, fn) {
    if (!fn) return;

    let elList = normalizeEls(els);
    let classList = normalizeClasses(classes);
    elList.forEach(el => {
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
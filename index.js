var hasClass, addClass, removeClass;
if (!('classList' in document.documentElement)) {
    hasClass = function(el, name) {
        var className = el.className;
        if (!className) {
            return false;
        }

        var regName = new RegExp('\\b'+name+'\\b','g');
        return regName.test(className);
    };
    addClass = function(el, name) {
        if (!hasClass.apply(this, arguments)) {
            el.className += ' ' + name;
        }
    };
    removeClass = function(el, name) {
        if (hasClass.apply(this, arguments)) {
            var regName = new RegExp('\\b'+name+'\\b','g');
            el.className = el.className.replace(regName, ' ');
        }
    };
} else {
    hasClass = function(el, name) {
        return el.classList.contains(name);
    };
    addClass = function(el, name) {
        el.classList.add(name);
    };
    removeClass = function(el, name) {
        el.classList.remove(name);
    };
}

var toggleClass = function(el, name, force) {
    if (force === undefined) {
        force = !hasClass.call(this, el, name);
    }
    // Bool param in classList.toggle isn't supported in all browsers
    // so just using addClass/removeClass
    if (force) {
        addClass.call(this, el, name);
    } else {
        removeClass.call(this, el, name);
    }
};

var normalizeEls = function(els) {
    if (Array.isArray(els)) {
        return els;
    }
    
    //FIXME: lame nodeList detect
    if (els.length) {
        return Array.prototype.slice.call(els);
    }
    
    // assuming single dom element
    return [ els ];
};

var normalizeClasses = function(classes) {
    if (Array.isArray(classes)) {
        return classes;
    }
    
    if (classes.indexOf(' ') > -1) {
        return classes.split(' ');
    }
    
    return [ classes ];
};

var forEachElementAndClass = function(els, classes, fn) {
    if (!fn) {
        return;
    }
    var elList = normalizeEls(els);
    var classList = normalizeClasses(classes);
    elList.forEach(function(el) {
        classList.forEach(function(cls) {
            fn.call(this, el, cls);
        });
    });
};

module.exports = {
    hasClass: hasClass,
    addClass: function(els, classes) {
        forEachElementAndClass(els, classes, function(el, cls) {
            addClass(el, cls);
        });
    },
    removeClass: function(els, classes) {
        forEachElementAndClass(els, classes, function(el, cls) {
            removeClass(el, cls);
        });
    },
    toggleClass: function(els, classes, force) {
        forEachElementAndClass(els, classes, function(el, cls) {
            toggleClass(el, cls, force);
        });
    }
};

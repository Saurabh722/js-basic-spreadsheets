(function bindEventWrapper() {
    // Get element by CSS selector:
    window.qs = function (selector, scope) {
        return (scope || document).querySelector(selector);
    };

    window.qsa = function (selector, scope) {
        return (scope || document).querySelectorAll(selector);
    };

    // addEventListener wrapper:
    window.$on = function (target, type, callback, useCapture) {
        target.addEventListener(type, callback, !!useCapture);
    };

    // Register events on elements that may or may not exist yet:
    // Usage $live('div a', 'click', function (event) {});
    window.$live = (function () {
        var eventRegistry = {};

        function dispatchEvent(event) {
            var targetElement = event.target;

            eventRegistry[event.type].forEach(function (entry) {
                var potentialElements = window.qsa(entry.selector);
                var hasMatch = Array.prototype.indexOf.call(potentialElements, targetElement) >= 0;

                if (hasMatch) {
                    entry.handler.call(targetElement, event);
                }
            });
        }

        return function (selector, event, handler) {
            if (!eventRegistry[event]) {
                eventRegistry[event] = [];
                if (event === "contextmenu") {
                    window.contextMenu(selector.split(","), event, dispatchEvent, true);
                } else {
                    window.$on(document.documentElement, event, dispatchEvent, true);
                }
            }

            eventRegistry[event].push({
                selector: selector,
                handler: handler
            });
        };
    }());

    // Few browser won't support for forEach for node selector array.
    NodeList.prototype.forEach = Array.prototype.forEach;
})();
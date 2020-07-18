import getContextMenuView from "./template";

let menu_el;

function _elementScopeClick(e, className) {
    var el = e.srcElement || e.target;

    if (el.classList.contains(className)) {
        return el;
    } else {
        while (el = el.parentNode) {
            if (el.classList && el.classList.contains(className)) {
                return el;
            }
        }
    }

    return false;
}

function toggleMenuOn() {
    if (!contextMenu.show) {
        contextMenu.show = true;
        menu_el.style.display = "block";
    }
}

function toggleMenuOff() {
    if (contextMenu.show) {
        contextMenu.show = false;
        menu_el.style.display = "none";
    }
}

function getPosition(e) {
    var posx = 0;
    var posy = 0;

    if (!e) var e = window.event;

    if (e.pageX || e.pageY) {
        posx = e.pageX;
        posy = e.pageY;
    } else if (e.clientX || e.clientY) {
        posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }

    return {
        x: posx,
        y: posy
    }
}

function positionMenu(e) {
    const clickCoords = getPosition(e);
    const clickCoordsX = clickCoords.x;
    const clickCoordsY = clickCoords.y;

    const menuWidth = menu_el.offsetWidth + 4;
    const menuHeight = menu_el.offsetHeight + 4;

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    if ((windowWidth - clickCoordsX) < menuWidth) {
        menu_el.style.left = windowWidth - menuWidth + "px";
    } else {
        menu_el.style.left = clickCoordsX + "px";
    }

    if ((windowHeight - clickCoordsY) < menuHeight) {
        menu_el.style.top = windowHeight - menuHeight + "px";
    } else {
        menu_el.style.top = clickCoordsY + "px";
    }
}

function showMenu (event, classList, callback) {
    let iselementScopeClick = false;

    for (let i = 0; i < classList.length; i++) {
        if (_elementScopeClick(event, classList[i].trim().substring(1))) {
            iselementScopeClick = true;
        }
    }

    if (iselementScopeClick) {
        event.preventDefault();
        toggleMenuOn();
        positionMenu(event);
        callback(event);
    } else {
        toggleMenuOff();
    }
}

function bindEvent() {
    window.contextMenu = function (classList, event, callback) {
        menu_el = qs("#js-spreadsheet-context-menu");
        contextMenu.show = 0;

        document.addEventListener("contextmenu", (e) => {
            showMenu(e, classList, callback);
        });

        $on(document, "click", function (e) {
            var isLink = _elementScopeClick(e, "js-spreadsheet-context-menu__link");
            var menuBtn = _elementScopeClick(e, "js-spreadsheet-head-menu-btn");

            if (isLink ) {
                e.preventDefault();
                toggleMenuOff();
            } else if (!menuBtn) {
                var button = e.which || e.button;
                if (button === 1) {
                    toggleMenuOff();
                }
            }
        });
    }
}

/**
 * Initialize context-menu view
 */
(function renderContextMenu() {
    const contextMenuEl = document.createElement(`NAV`);
    contextMenuEl.setAttribute("id", "js-spreadsheet-context-menu");
    contextMenuEl.classList.add("js-spreadsheet-context-menu");
    contextMenuEl.innerHTML = getContextMenuView();
    document.body.appendChild(contextMenuEl);
    bindEvent();
})();

function contextMenuHandler (row, col, selected) {
    const menuItems = qs(".js-spreadsheet-context-menu__items");
    menuItems.classList.remove(
        "js-spreadsheet-context-menu__items--selected_row",
        "js-spreadsheet-context-menu__items--selected_col",
        "js-spreadsheet-context-menu__items--selected_rows",
        "js-spreadsheet-context-menu__items--selected_cols"
    );

    if (typeof row === "number" && row !== -1) {
        if (selected.length > 1) {
            menuItems.classList.add("js-spreadsheet-context-menu__items--selected_rows");
        } else {
            menuItems.classList.add("js-spreadsheet-context-menu__items--selected_row");
        }
    } else if (typeof col === "number" && col !== -1) {
        if (selected.length > 1) {
            menuItems.classList.add("js-spreadsheet-context-menu__items--selected_cols");
        } else {
            menuItems.classList.add("js-spreadsheet-context-menu__items--selected_col");
        }
    }
}

export default {
    show: showMenu,
    handler: contextMenuHandler
};

const menuItems = qs(".js-spreadsheet-context-menu__items");

function contextMenuHandler (row, col, selected) {
    menuItems.classList.remove(
        "js-spreadsheet-context-menu__items--selected_row",
        "js-spreadsheet-context-menu__items--selected_col",
        "js-spreadsheet-context-menu__items--selected_rows",
        "js-spreadsheet-context-menu__items--selected_cols"
    );

    if (row) {
        if (selected.length > 1) {
            menuItems.classList.add("js-spreadsheet-context-menu__items--selected_rows");
        } else {
            menuItems.classList.add("js-spreadsheet-context-menu__items--selected_row");
        }
    } else if (col) {
        if (selected.length > 1) {
            menuItems.classList.add("js-spreadsheet-context-menu__items--selected_cols");
        } else {
            menuItems.classList.add("js-spreadsheet-context-menu__items--selected_col");
        }
    }
}

window.contextMenu = function (classList, event, callback) {
    const menu_el = qs("#js-spreadsheet-context-menu");
    contextMenu.show = 0;

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

    document.addEventListener("contextmenu", function (e) {
        let iselementScopeClick = false;

        for (let i = 0; i < classList.length; i++) {
            if (_elementScopeClick(e, classList[i].trim().substring(1))) {
                iselementScopeClick = true;
            }
        }

        if (iselementScopeClick) {
            e.preventDefault();
            toggleMenuOn();
            positionMenu(e);
            callback(e);
        } else {
            toggleMenuOff();
        }
    });

    $on(document, "click", function (e) {
        var isLink = _elementScopeClick(e, "js-spreadsheet-context-menu__link");

        if (isLink) {
            e.preventDefault();
            toggleMenuOff();
        } else {
            var button = e.which || e.button;
            if (button === 1) {
                toggleMenuOff();
            }
        }
    });
}

export default contextMenuHandler;

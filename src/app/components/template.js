/**
 * Initialize the context-menu view.
 * @returns {String} context-menu as View String.
 */
function getContextMenuView () {
    return `
		<ul class="js-spreadsheet-context-menu__items">
			<li class="js-spreadsheet-context-menu__item">
				<a href="#" class="js-spreadsheet-context-menu__link js-spreadsheet-context-menu__col" data-action="trigger-sort">Sort</a>
			</li>
			<li class="js-spreadsheet-context-menu__item">
				<a href="#" class="js-spreadsheet-context-menu__link js-spreadsheet-context-menu__col" data-action="insert-left">Insert Left</a>
			</li>
			<li class="js-spreadsheet-context-menu__item">
				<a href="#" class="js-spreadsheet-context-menu__link js-spreadsheet-context-menu__col" data-action="insert-right">Insert Right</a>
			</li>
			<li class="js-spreadsheet-context-menu__item">
				<a href="#" class="js-spreadsheet-context-menu__link js-spreadsheet-context-menu__col" data-action="delete-column">Delete Column</a>
			</li>
			<li class="js-spreadsheet-context-menu__item">
				<a href="#" class="js-spreadsheet-context-menu__link js-spreadsheet-context-menu__col js-spreadsheet-context-menu__cols" data-action="delete-columns">Delete Columns</a>
			</li>
			<li class="js-spreadsheet-context-menu__item">
				<a href="#" class="js-spreadsheet-context-menu__link js-spreadsheet-context-menu__row" data-action="insert-above">Insert Above</a>
			</li>
			<li class="js-spreadsheet-context-menu__item">
				<a href="#" class="js-spreadsheet-context-menu__link js-spreadsheet-context-menu__row" data-action="insert-below">Insert Below</a>
			</li>
			<li class="js-spreadsheet-context-menu__item">
				<a href="#" class="js-spreadsheet-context-menu__link js-spreadsheet-context-menu__row" data-action="delete-row">Delete Row</a>
			</li>
			<li class="js-spreadsheet-context-menu__item">
				<a href="#" class="js-spreadsheet-context-menu__link js-spreadsheet-context-menu__row js-spreadsheet-context-menu__rows" data-action="delete-rows">Delete Rows</a>
			</li>
		</ul>`;
}

export default getContextMenuView;
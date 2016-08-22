(function () {
	'use strict'

	var table = document.getElementById('table'),
		tableTh = table.querySelectorAll('th'),
		btnDelete = document.getElementById('btn-delete'),
		textBlockCollection = document.querySelectorAll('.text'),
		checkboxCollection = table.querySelectorAll('input[type="checkbox"]'),
		topClass = 'top',
		bottomClass = 'bottom',
		editClass = 'edit';


	/**
	* tableConstructor() sort table constructor
	* based on the passed parameters
	*
	* @param {table} table
	* @param {textItem} text items collection
	*/

	var tableConstructor = function (table, textItem) {
		var self = this;
			this.table = table;
			this.currentCell;
			this.inputCollection;
			this.input = document.createElement('input');
			this.input.type = 'text';
			this.index;

		for (var i = 0; i < textItem.length; i++) {
			var inputClone = this.input.cloneNode(true);
			textItem[i].appendChild(inputClone);
		}
		this.inputCollection = document.querySelectorAll('input[type="text"]');
	}

	/**
	* editTable() edit table cells
	* based on the passed parameters
	*
	* @param {collection} input collection
	*/
	tableConstructor.prototype.editTable = function (collection) {
		for (var i = 0; i < collection.length; i++) {
			(function (i) {
				var currentInput = collection[i];
				currentInput.addEventListener('focus', function () {
					this.value = currentInput.closest('.text').getElementsByTagName('span')[0].innerText;
				});
				currentInput.addEventListener('blur', function () {
					currentInput.closest('.text').getElementsByTagName('span')[0].innerText = this.value;
					currentInput.closest('td').classList.remove(editClass);
				});
			})(i)
		}
	}

	/**
	* rowRemove() remove table rows
	* based on the passed parameters
	*
	* @param {collection} row collection
	*/
	tableConstructor.prototype.rowRemove = function (collection) {
		for (var i = 0; i < collection.length; i++) {
			var item = collection[i];
			if (item.type === 'checkbox' && item.checked) {
				item.closest('tr').remove();
			}
		}
	}

	/**
	* sort() sort table
	* based on the passed parameters
	*
	* @param {event} event
	* @param {target} target
	*/
	tableConstructor.prototype.sort = function (event, target) {
		var self = this;
		[].forEach.call(tableTh, function (th, i) {
            if (target === th) {
                self.index = i;
            }
        });
        var arrayCols = this.table.querySelectorAll('tr td:nth-child(' + (this.index + 1) + ')'),
        	colsText = sortData(arrayCols);

        [].forEach.call(tableTh, function (th) {
            if (th.classList.contains(topClass)) {
                colsText.reverse();
            }
        });

        colsText.forEach(function (name, i) {
            arrayCols[i].innerHTML = name;
        });

		//function for data sort
		function sortData(elements) {
	        var data = [];

	        for (var i = 0; i < elements.length; i++) {
	        	data.push(elements[i].innerHTML);
	        }

	        data.sort(function (a, b) {
	            if (a < b) {
	               return -1;
	            } else if (a > b) {
	                return 1;
	            } else {
	            	return 0;
	            }
	        });

	        return data;
	    }

	}

	/**
	* inputEdit() edit table
	* based on the passed parameters
	*
	* @param {event} event
	*/
	tableConstructor.prototype.inputEdit = function (event) {
		var currentCell = event.target.closest('td');
		if (currentCell) {
			var currentInput = currentCell.querySelectorAll('input[type="text"]')[0];
			if (currentInput) {
				currentCell.classList.add(editClass);
				currentInput.focus();
			}
		}
	}

	//function adding events for sort table
	var sortTable = new tableConstructor(table, textBlockCollection);

	//adding event for inputs showing
	table.addEventListener('dblclick', sortTable.inputEdit);

	//function edit table
	sortTable.editTable(sortTable.inputCollection);

	//adding event for row remove
	btnDelete.onclick = function () {
	  sortTable.rowRemove(checkboxCollection);
	};

    //adding event for sort table
    table.addEventListener('click', function (event) {
    	var targetElemt = event.target;
    	if (targetElemt.tagName === 'TH') {
    		if (targetElemt.classList.contains(bottomClass)) {
                targetElemt.classList.remove(bottomClass);
                targetElemt.classList.add(topClass);
                sortTable.sort(event, targetElemt);
            } else {
                targetElemt.classList.add(bottomClass);
                targetElemt.classList.remove(topClass);
                sortTable.sort(event, targetElemt);
            }
    	}
    });
})();
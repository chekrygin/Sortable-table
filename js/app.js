(function () {
	'use strict'

	var table = document.getElementById('table'),
		tableTh = table.querySelectorAll('th'),
		btnDelete = document.getElementById('btn-delete'),
		textBlockCollection = document.querySelectorAll('.text'),
		checkboxCollection = table.querySelectorAll('input[type="checkbox"]'),
		topClass = 'top',
		inputCollection,
		bottomClass = 'bottom',
		editClass = 'edit';


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

	tableConstructor.prototype.rowRemove = function (collection) {
		for (var i = 0; i < collection.length; i++) {
			var item = collection[i];
			if (item.type === 'checkbox' && item.checked) {
				item.closest('tr').remove();
			}
		}
	}

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

	var sortTable = new tableConstructor(table, textBlockCollection);

	table.addEventListener('dblclick', sortTable.inputEdit);

	sortTable.editTable(sortTable.inputCollection);

	btnDelete.onclick = function () {
	  sortTable.rowRemove(checkboxCollection);
	};

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

	/**
	* sortTable() sort table's cell
	* based on the passed parameters
	*
	* @param {item} table
	* @param {item} col
	* @param {number} reverse
	*/
	// function sortTable(table, col, reverse) {
	//     var tbody = table.tBodies[0],
	//         tr = Array.prototype.slice.call(tbody.rows, 0),
	//         i;

	//     reverse = -((+reverse) || -1);
	//     tr = tr.sort(function (a, b) {
	//         return reverse * (a.cells[col].textContent.trim().localeCompare(b.cells[col].textContent.trim()));
	//     });

	//     for (i = 0; i < tr.length; ++i) {
	//     	tbody.appendChild(tr[i]);
	//     }
	// }

	/**
	* removeItem() remove table rows
	* based on the passed parameters
	*
	* @param {item} item
	*/
	// function removeItem (item) {
	// 	if (item) {
	// 		var curentRow = item.closest('tr'),
	// 			currentCheckbox = curentRow.querySelector('input[type="checkbox"]');
	// 		if (currentCheckbox.checked) {
	// 			curentRow.remove();
	// 		}
	// 	}
	// }

	// function appendInput () {
	// 	for (var i = 0; i < textBlockCollection.length; i++) {
	// 		var inputClone = input.cloneNode(true);
	// 		textBlockCollection[i].appendChild(inputClone);
	// 	}
	// 	inputCollection = document.querySelectorAll('input[type="text"]');
	// }

	//function adding events for sort table
	// function eventSortTable () {
	// 	for (var j = tCells.length - 1; j >= 0 ; j--) {
	// 		var currentItem = tCells[j],
	// 			dir = 1;
	// 		(function (j){
	// 			currentItem.addEventListener('click', function () {
	// 				if (this.classList.contains(topClass)) {
	// 					this.classList.remove(topClass);
	// 					this.classList.add(bottomClass);
	// 				} else {
	// 					this.classList.remove(bottomClass);
	// 					this.classList.add(topClass);
	// 				}
	// 	        	sortTable(table, j, (dir = 1 - dir))
	// 	        });
	// 		})(j)
	// 	}
	// }

	// function adding events for edit table cell
	// function eventEditTable () {
	// 	for (var i = 0; i < inputCollection.length; i++) {
	// 		var currentInput = inputCollection[i];
	// 		currentInput.addEventListener('focus', function () {
	// 			this.value = currentCell.getElementsByTagName('span')[0].innerText;
	// 		});
	// 		currentInput.addEventListener('blur', function () {
	// 			currentCell.getElementsByTagName('span')[0].innerText = this.value;
	// 			currentCell.classList.remove(editClass);
	// 		});
	// 	}
	// }

	// function removing row from table
	// function eventInputEdit (event) {
	// 	currentCell = event.target.closest('td');
	// 	if (currentCell) {
	// 		var currentInput = currentCell.querySelectorAll('input[type="text"]')[0];
	// 		if (currentInput) {
	// 			currentCell.classList.add(editClass);
	// 			currentInput.focus();
	// 		}
	// 	}
	// }

	// function removing row from table
	// function eventRowRemovin (event) {
	// 	if (event.target.className === buttonCollection[0].className) {
	// 		removeItem(event.target);
	// 	}
	// }

	// event for showing edit input
	// table.addEventListener('dblclick', eventInputEdit);

	// ivent for row removing
	// table.addEventListener('click', eventRowRemovin);

	// init function append inputs
	// appendInput();

	// init function adding events for sort table
	// eventSortTable();

	// init function adding events for edit table cell
	// eventEditTable();

})();
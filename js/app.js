(function () {
	'use strict'

	var table = document.querySelectorAll('.table'),
		thead = table[0].tHead,
		tCells = thead.rows[0].cells,
		inputCollection = document.querySelectorAll('input[type="text"]'),
		buttonCollection = document.querySelectorAll('.btn-delete'),
		currentCell,
		topClass = 'top',
		bottomClass = 'bottom',
		editClass = 'edit';

	/**
	* sortTable() sort table's cell
	* based on the passed parameters
	*
	* @param {item} table
	* @param {item} col
	* @param {number} reverse
	*/
	function sortTable(table, col, reverse) {
	    var tbody = table.tBodies[0],
	        tr = Array.prototype.slice.call(tbody.rows, 0),
	        i;

	    reverse = -((+reverse) || -1);
	    tr = tr.sort(function (a, b) {
	        return reverse * (a.cells[col].textContent.trim().localeCompare(b.cells[col].textContent.trim()));
	    });

	    for (i = 0; i < tr.length; ++i) {
	    	tbody.appendChild(tr[i]);
	    }
	}

	/**
	* removeItem() remove table rows
	* based on the passed parameters
	*
	* @param {item} item
	*/
	function removeItem (item) {
		if (item) {
			var curentRow = item.closest('tr'),
				currentCheckbox = curentRow.querySelectorAll('input[type="checkbox"]')[0];
			if (currentCheckbox.checked) {
				curentRow.remove();
			}
		}
	}

	// loop for adding events for sort table
	for (var j = tCells.length - 1; j >= 0 ; j--) {
		var currentItem = tCells[j],
			dir = 1;
		(function (j){
			currentItem.addEventListener('click', function () {
				if (this.classList.contains(topClass)) {
					this.classList.remove(topClass);
					this.classList.add(bottomClass);
				} else {
					this.classList.remove(bottomClass);
					this.classList.add(topClass);
				}
	        	sortTable(table[0], j, (dir = 1 - dir))
	        });
		})(j)
	}

	// loop for adding events for edit table cell
	for (var i = 0; i < inputCollection.length; i++) {
		var currentInput = inputCollection[i];
		currentInput.addEventListener('focus', function () {
			this.value = currentCell.getElementsByTagName('span')[0].innerText;
		});
		currentInput.addEventListener('blur', function () {
			currentCell.getElementsByTagName('span')[0].innerText = this.value;
			currentCell.classList.remove(editClass);
		});
	}

	// event for showing edit input
	table[0].addEventListener('dblclick', function(event) {
		currentCell = event.target.closest('td');
		if (currentCell) {
			var currentInput = currentCell.querySelectorAll('input[type="text"]')[0];
			if (currentInput) {
				currentCell.classList.add(editClass);
				currentInput.focus();
			}
		}
	});

	// event for row removing
	table[0].addEventListener('click', function (event) {
		if (event.target.className === buttonCollection[0].className) {
			removeItem(event.target);
		}
	});

})();
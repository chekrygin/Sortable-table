(function () {
	'use strict'

	var table = document.getElementById('table'),
		thead = table.tHead,
		tCells = thead.rows[0].cells,
		input = document.createElement('input'),
		buttonCollection = document.querySelectorAll('.btn-delete'),
		textBlockCollection = document.querySelectorAll('.text'),
		currentCell,
		topClass = 'top',
		inputCollection,
		bottomClass = 'bottom',
		editClass = 'edit';
		input.type = 'text';

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
				currentCheckbox = curentRow.querySelector('input[type="checkbox"]');
			if (currentCheckbox.checked) {
				curentRow.remove();
			}
		}
	}

	function appendInput () {
		for (var i = 0; i < textBlockCollection.length; i++) {
			var inputClone = input.cloneNode(true);
			textBlockCollection[i].appendChild(inputClone);
		}
		inputCollection = document.querySelectorAll('input[type="text"]');
	}

	//function adding events for sort table
	function eventSortTable () {
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
		        	sortTable(table, j, (dir = 1 - dir))
		        });
			})(j)
		}
	}

	// function adding events for edit table cell
	function eventEditTable () {
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
	}

	// function removing row from table
	function eventInputEdit (event) {
		currentCell = event.target.closest('td');
		if (currentCell) {
			var currentInput = currentCell.querySelectorAll('input[type="text"]')[0];
			if (currentInput) {
				currentCell.classList.add(editClass);
				currentInput.focus();
			}
		}
	}

	// function removing row from table
	function eventRowRemovin (event) {
		if (event.target.className === buttonCollection[0].className) {
			removeItem(event.target);
		}
	}

	// event for showing edit input
	table.addEventListener('dblclick', eventInputEdit);

	// ivent for row removing
	table.addEventListener('click', eventRowRemovin);

	// init function append inputs
	appendInput();

	// init function adding events for sort table
	eventSortTable();

	// init function adding events for edit table cell
	eventEditTable();

})();
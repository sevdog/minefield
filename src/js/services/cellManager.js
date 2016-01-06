/**
 * The MIT License (MIT)
 * Copyright (c) 2016 
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
(function(ng) {
	function shuffle(array) {
		var counter = array.length,
			temp,
			index;
		// While there are elements in the array
		while (counter > 0) {
			// Pick a random index
			index = Math.floor(Math.random() * counter);

			// Decrease counter by 1
			--counter;
			// And swap the last element with it
			temp = array[counter];
			array[counter] = array[index];
			array[index] = temp;
		}

		return array;
	}
	ng.module('minefield').factory('cellManager', ['rows', 'columns', 'mines', cellManager]);
	function cellManager(rows, columns, mines) {
		return {
			field: [],
			createField: createField,
			propagateShow: propagateShow,
			showAll: showAll
		};
		function createField() {
			var rawCells = [],
				totalCell = rows * columns;
			// initialize cells
			for (var c = 0; c < totalCell; ++c) {
				// add a raw cell with counter value 9 only for mines elements
				rawCells[rawCells.length] = c < mines ? 9 : 0;
			}
			// shuffle cells
			rawCells = shuffle(rawCells);
			var organizedCells = rawCells.reduce(function(organized, cellValue, idx) {
				// save row idx for practice
				var rowIdx = organized.length;
				if (idx % columns == 0) {
					// if first column then create a row
					organized[rowIdx] = [];
				} else {
					// if not reduce idx by 1
					--rowIdx;
				}
				// add a value for the cell
				organized[rowIdx][organized[rowIdx].length] = {
					value: cellValue,
					shown: false
				};
				return organized;
			}, []);
			// now set the correct values for the elements
			for (var row = 0; row < rows; ++row) {
				for (var col = 0; col < columns; ++col) {
					if (organizedCells[row][col].value >= 9) {
						// set the mine flag
						organizedCells[row][col].isMine = true;
						// if found a mine, update neighbours counters
						// the check are to avoid out of bounds
						for (var rr = row == 0 ? row : row - 1; rr <= row + 1 && rr < rows; ++rr) {
							for (var cc = col == 0 ? col : col - 1;  cc <= col + 1 && cc < columns; ++cc) {
								++organizedCells[rr][cc].value;
							}
						}
					}
				}
			}
			this.field = organizedCells;
			return organizedCells;
		}
		function propagateShow(row, col) {
			var self = this;
			for (var rr = row == 0 ? row : row - 1; rr <= row + 1 && rr < rows; ++rr) {
				for (var cc = col == 0 ? col : col - 1;  cc <= col + 1 && cc < columns; ++cc) {
					var cell = self.field[rr][cc];
					if (!cell.isMine && !cell.shown) {
						// if the cell is not shown and is not a mine show it
						cell.shown = true;
						if (cell.value == 0) {
							// if it is a 0 propagate
							self.propagateShow(rr,cc);
						}
					}
				}
			}
		}
		function showAll() {
			var self = this;
			for (var row = 0; row < rows; ++row) {
				for (var col = 0; col < columns; ++col) {
					self.field[row][col].shown = true;
				}
			}
		}
	}
})(angular);

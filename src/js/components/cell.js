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
	ng.module('minefield').directive('cell', cellDirective);
	function cellDirective() {
		return {
			restrict: 'E',
			scope: {
				row: '=',
				col: '=',
				info: '='
			},
			link: CellLink,
			controllerAs: 'cell',
			bindToController: true,
			controller: ['$timeout', 'cellManager', CellController],
			template: '<div class="cell-flipper">' +
					'<button type="button" class="btn btn-warning cell-front" ng-click="cell.show()"></button>' +
					'<div class="btn btn-default cell-back">' +
						'<i ng-if="cell.info.isMine" class="fa fa-bomb"></i>' +
						'<i ng-if="!cell.info.isMine && cell.info.value == 0"></i>' +
						'<i ng-if="!cell.info.isMine && cell.info.value != 0" ng-class="\'cell-help-\' + cell.info.value">{{:: cell.info.value }}</i>' +
					'</div>' +
				'</div>'
		}
	}
	function CellLink(scope, element) {
		scope.$watch('cell.info.shown', function(newVal, oldVal) {
			if (newVal) {
				// change class of element and remove tabindex
				element.addClass('shown').find('button').attr('tabindex', '-1');
			}
		});
		scope.$watch('cell.info.exploded', function(newVal, oldVal) {
			// change class of element
			if (newVal) {
				element.addClass('exploded');
				ng.element(element[0].querySelector('.cell-back')).removeClass('btn-default').addClass('btn-danger');
			} else {
				element.removeClass('exploded');
			}
		});
	}
	
	function CellController($timeout, cellManager) {
		var self = this,
			info = self.info;
		self.show = showCell;
		
		function showCell() {
			// first show cell
			info.shown = true;
			if (!info.isMine && info.value == 0) {
				// if is not a mine propagate the click to near cells
				cellManager.propagateShow(self.row, self.col);
			}
			if (info.isMine) {
				// mine explosion
				$timeout(function() {
					info.exploded = true;
					$timeout(function() {
						info.exploded = false;
						// show all after explosion
						cellManager.showAll();
					}, 1000);
				}, 600);
			}
		}
	};
})(angular);

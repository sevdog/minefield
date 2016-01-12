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
					'<button type="button" class="btn btn-warning cell-front" ng-click="cell.show()" ng-right-click="cell.flag()">' +
						'<i class="fa fa-flag" ng-show="cell.info.flagged"></i>' +
					'</button>' +
					'<div class="btn cell-back" ng-class="{\'btn-danger\': cell.info.isMine && cell.info.exploded ,\'btn-success\': cell.info.flagged && cell.info.isMine}">' +
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
		scope.$watch('cell.info.exploding', function(newVal, oldVal) {
			// change class of element
			if (newVal) {
				element.addClass('exploding');
			} else {
				element.removeClass('exploding');
			}
		});
	}
	
	function CellController($timeout, cellManager) {
		var self = this,
			info = self.info;
		self.show = showCell;
		self.flag = flagCell;
		
		function showCell() {
			if (cellManager.shared.lost || cellManager.shared.win || info.flagged) {
				// if the game is already lost or win don't do nothing
				return;
			}
			// first show cell
			info.shown = true;
			if (!info.isMine && info.value == 0) {
				// if is not a mine propagate the click to near cells
				cellManager.propagateShow(self.row, self.col);
			}
			if (info.isMine) {
				cellManager.shared.lost = true;
				// mine explosion
				$timeout(function() {
					info.exploding = true;
					$timeout(function() {
						info.exploding = false;
						info.exploded = true;
						// show all after explosion
						cellManager.showAll();
					}, 1000);
				}, 600);
			}
		}
		
		function flagCell() {
			if (cellManager.shared.lost || cellManager.shared.win) {
				// if the game is already lost or win don't do nothing
				return;
			}
			info.flagged = !info.flagged;
		}
	};
})(angular);

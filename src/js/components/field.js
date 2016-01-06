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
	ng.module('minefield').directive('field', fieldDirective);
	function fieldDirective() {
		return {
			restrict: 'E',
			scope: {},
			controllerAs: 'field',
			controller: ['mines', 'cellGenerator', FieldController],
			template: '<div class="field-row" ng-repeat="row in field.rows track by $index" ng-init="rowIdx = $index">' +
					'<cell ng-repeat="value in row track by $index" col="$index" row="rowIdx" value="value"></cell>' +
				'</div>'
		}
	}
	
	function FieldController(mines, cellGenerator) {
		//TODO
		var self = this;
		self.rows = cellGenerator.createField();
	};
})(angular);

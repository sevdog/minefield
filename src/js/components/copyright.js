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
	// define copyright directive
	angular.module('minefield').directive('copyRight', copyRightDirective);
	function copyRightDirective() {
		return {
			restrict: 'E',
			scope: {},
			controllerAs: 'cpr',
			controller: ['version', 'crYearTo', 'crYearFrom', 'crOwner', copyRightController],
			template: '<footer class="text-right text-muted">' +
				'<h5>{{:: \'version\' | translate }} {{:: cpr.version }}</h5>' +
				'<i class="fa fa-copyright"></i> {{:: cpr.year }} {{ cpr.owner }}' +
				'</footer>'
		}
	}
	// define controller
	function copyRightController(version, crYearTo, crYearFrom, crOwner) {
		var self = this;
		self.version = version;
		self.year = crYearFrom + (crYearTo ? '-' + crYearTo : '');
		self.owner = crOwner;
	}
})(angular);

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
	ng.module('minefield').directive('settings', cellDirective);
	function cellDirective() {
		return {
			restrict: 'E',
			controllerAs: 'stg',
			controller: ['$scope', 'cellManager', SettingsController],
			template: '<div class="row">' +
					'<div class="col-xs-6 col-sm-4">' +
						'<label>{{:: "mines" | translate }}</label>' +
						'<input class="form-control" type="number" ng-model="stg.values.mines" step="1">' +
					'</div>' +
					'<div class="col-xs-6 col-sm-8">' +
						'<button type="button" class="btn btn-primary" ng-click="stg.play()">' +
							'<i class="fa fa-play"></i>' +
						'</button>' +
					'</div>' +
				'</div>'
		}
	}
	
	function SettingsController($scope, cellManager) {
		var self = this;
		self.values = cellManager.shared;
		
		self.play = playGame;
		
		function playGame() {
			cellManager.reload();
		}
	};
})(angular);

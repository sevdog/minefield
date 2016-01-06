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
	// module definition
	ng.module('minefield', ['ngAnimate', 'ngTouch', 'ngAria', 'pascalprecht.translate', 'LocalStorageModule']);
	// configure providers
	ng.module('minefield').config(['$translateProvider', 'localStorageServiceProvider', configProviders]);
	function configProviders($translateProvider, localStorageServiceProvider) {
		$translateProvider.translations('it', MSG_IT)
			.translations('en', MSG_EN)
			.determinePreferredLanguage()
			.fallbackLanguage('en');
		localStorageServiceProvider
			.setStorageType('localStorage')
			.setPrefix('minefield');
	}
	// define constants
	ng.module('minefield').constant('version', '0.1.0');
	ng.module('minefield').constant('crYearFrom', '2016');
	ng.module('minefield').constant('crYearTo', '');
	ng.module('minefield').constant('crOwner', 'sevdog');
	ng.module('minefield').constant('rows', 10);
	ng.module('minefield').constant('columns', 10);
	ng.module('minefield').constant('mines', 10);
})(angular);

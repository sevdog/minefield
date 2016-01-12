module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			dist: {
				options: {
					mangle: {
						except: ['angular']
					},
					wrap: '<%= pkg.name %> ',
					compress: true,
					banner: '/*! <%= pkg.name %>  \n'
						+ ' * Copyright 2016-<%= grunt.template.today("yyyy") %> sevdog\n'
						+ ' *\n'
						+ ' * Permission is hereby granted, free of charge, to any person obtaining a copy\n'
						+ ' * of this software and associated documentation files (the "Software"), to deal\n'
						+ ' * in the Software without restriction, including without limitation the rights\n'
						+ ' * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\n'
						+ ' * copies of the Software, and to permit persons to whom the Software is\n'
						+ ' * furnished to do so, subject to the following conditions:\n'
						+ ' * \n'
						+ ' * The above copyright notice and this permission notice shall be included in all\n'
						+ ' * copies or substantial portions of the Software.'
						+ ' * \n'
						+ ' * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\n'
						+ ' * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\n'
						+ ' * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\n'
						+ ' * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\n'
						+ ' * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\n'
						+ ' * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\n'
						+ ' * SOFTWARE.. \n */\n'
				},
				src: ['src/js/i18n/*.js', 'src/js/app.js', 'src/js/components/*.js',
				      'src/js/services/*.js'],
				dest: 'dist/js/<%= pkg.name %>.js'
			},
			pack: {
				mangle: false,
				src: ['src/js/assets/angular.min.js', 'src/js/assets/*.js'],
				dest: 'dist/js/assets.js'
			}
		},
		copy : {
			pack: {
				expand: true,
				cwd: 'src/fonts/',
				src: '**',
				dest: 'dist/fonts/'
			}
		},
		cssmin: {
			options: {
				s0: true,
			},
			dist: {
				src: 'src/css/*.css',
				dest: 'dist/css/<%= pkg.name %>.css'
			},
			pack: {
				src: 'src/css/assets/*.css',
				dest: 'dist/css/assets.css'
			}
		},
		replace: {
			pack: {
				options: {
					patterns: [{
						match: '../../fonts/',
						replacement: '../fonts/'
					}],
					usePrefix: false
				},
				src: 'dist/css/assets.css',
				dest: 'dist/css/assets.css'
			},
			dist: {
				options: {
					patterns: [{
						match: /<!-- Dev(.|\s)*?\/Dev -->/g,
						replacement: ''
					}, {
						match: '<!-- Prod-js -->',
						replacement: '<script type="text/javascript" src="./js/assets.js"></script>\n' +
							'	<script type="text/javascript" src="./js/<%= pkg.name %>.js"></script>'
					}, {
						match: '<!-- Prod-css -->',
						replacement: '<link href="./css/assets.css" type="text/css" rel="stylesheet">\n' +
							'	<link href="./css/<%= pkg.name %>.css" type="text/css" rel="stylesheet">'
					}],
					usePrefix: false
				},
				src: 'src/index.html',
				dest: 'dist/index.html'
			}
		},
		jasmine: {
			src: ['src/js/app/i18n/*.js', 'src/js/app/app.js', 'src/js/app/controllers/*.js',
			      'src/js/app/services/*.js', 'src/js/app/directives/*.js', 
			      'src/js/app/templates/<%= pkg.name %>.js'],
			options: {
				vendor: ['src/js/assets/angular.min.js', 'src/js/assets/*.js'],
				helpers: ['test//helpers/*.js'],
				specs: ['test/services/*.js'],
				summary: true
			}
		},
		sass: {
			theme: {
				files: {
					'src/css/theme.css': 'theme/theme.scss'
				}
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-replace');
	grunt.loadNpmTasks('grunt-contrib-jasmine');

	grunt.registerTask('dist', ['uglify:dist', 'replace:dist', 'cssmin:dist']);
	grunt.registerTask('pack', ['uglify:pack', 'copy:pack', 'cssmin:pack', 'replace:pack']);
	grunt.registerTask('test', ['jasmine']);

};

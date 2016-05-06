(function() {
	'use strict';

	var facebookCalendar = require('./modules/fb-no-promise');
	var slideContainer = require('./modules/slide-container-inner');
	var socialHover = require('./modules/social-hover');

	var app = {
		launcher: function() {

			slideContainer.start();
			facebookCalendar.showCalendar();
			socialHover.set();

		}
	};

	app.launcher();

})();

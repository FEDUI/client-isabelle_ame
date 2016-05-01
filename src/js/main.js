(function() {
	'use strict';

	var facebookCalendar = require('./modules/facebook-calendar');
	var slideContainer = require('./modules/slide-container-inner');

	var app = {
		launcher: function() {

			facebookCalendar.showCalendar();
			slideContainer.start();

		}
	};

	app.launcher();

})();

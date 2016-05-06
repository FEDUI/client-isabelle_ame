var nanoajax = require('nanoajax');
var key = require('./key')

var facebookCalendar = {};

facebookCalendar.showCalendar = function() {

	window.dataReady = false;

	var data = facebookCalendar.getData();

}

facebookCalendar.getData = function() {

	var accessToken;
	var data;

	var getAccesUrl = "https://graph.facebook.com/oauth/access_token?client_id=" + key.id + "&client_secret=" + key.secret + "&grant_type=client_credentials";
	nanoajax.ajax({url: getAccesUrl}, function(response, responseText) { 

		if (response) {

			accessToken = responseText;

			var accesUrl = "https://graph.facebook.com/" + key.user + "/?fields=events&" + accessToken;
			
			nanoajax.ajax({url: accesUrl}, function(response, responseText) { 

				if (response) {

					data = JSON.parse(responseText);
					window.dataReady = true;
					var reorderedData = facebookCalendar.reorderData(data);
					facebookCalendar.renderData(reorderedData);

				}

			});

		}

	});

};

facebookCalendar.reorderData = function(data) {

	var _data = data;
	var items = _data.events.data;
	var nextItems = _data.events.paging.next;
	var fbEvents = [];
	var pastFbEvents = [];
	var justPastEvents;
	var lastEventsNumber = 3;

	var containerWidth = document.querySelector('section.calendar').offsetWidth;
	
	var nameLength = 20;	
	if ( containerWidth > 400 && containerWidth < 500 ) {
		nameLength = 30;
	} else if ( containerWidth > 500 && containerWidth < 600 ) {
		nameLength = 35;
	} else if ( containerWidth > 600 && containerWidth < 700 ) {
		nameLength = 40;
	} else if ( containerWidth > 700 ) {
		nameLength = 50;
	}

	items.forEach(function(item) {

		var _this = item;
		var gig = {};
		var gigData = _this.start_time;

		if ( _this.name ) {

			if ( _this.name.length > nameLength ) {
				gig.title = facebookCalendar.cutString(_this.name, nameLength) + "...";
			} else {
				gig.title = _this.name;
			}
			
		} else {
			gig.title = "Onbekend";
		}

		if ( _this.place ) {
			gig.link = "https://www.facebook.com/events/" + _this.id;	
		} else {
			gig.link = "";
		}
		
		if ( _this.place ) {

			if ( (_this.name.length + _this.place.location.city.length) > 25 ) {
				gig.location_name = facebookCalendar.cutString(_this.place.name, 14);
			} else {
				gig.location_name = _this.place.name;
			}

			
		} else {
			gig.location_name = "Onbekend";
		}

		if ( _this.place && _this.place.location ) {
			gig.location_city = _this.place.location.city;
		} else {
			gig.location_city = "Onbekend";
		}

		if ( _this.start_time ) {

			var monthNumber = gigData.slice(5, 7);

			gig.year = gigData.slice(0, 4);
			gig.day = gigData.slice(8, 10);
			gig.month = facebookCalendar.setMonth(monthNumber);
			gig.class = facebookCalendar.checkIfPast(gigData);

		}
		
		if ( gig.class == "past" ) {
			pastFbEvents.push(gig);
		} else {
			fbEvents.push(gig);
		}

	});

	// Push the last three events to the fbEvents array
	justPastEvents = pastFbEvents.slice(0, lastEventsNumber);
	justPastEvents.forEach(function(event) {
		fbEvents.push(event);
	});

	return fbEvents;

};

facebookCalendar.checkIfPast = function(gigData) {

	var _gigData = gigData;

	var today = new Date();
	var todayNumber = Date.parse(today);
	var gigDataNumber = Date.parse(_gigData);

	if ( gigDataNumber < todayNumber ) {
			
		return "past";

	} else {
		
		return "upcomming";

	}

};

facebookCalendar.cutString = function(stringValue, amount) {

	var _amount = amount;
	var _stringValue = stringValue;
	var strLength = _stringValue.length;
	var slicedStr = _stringValue.slice(0, _amount);

	return slicedStr;

};

facebookCalendar.setMonth = function(number) {

	var _number = number;
	
	if ( _number.charAt(0) == 0 ) {
		_number = _number.charAt(1);
	}

	if (_number == 1) {
		return "Jan";
	} else if (_number == 2) {
		return "Feb";
	} else if (_number == 3) {
		return "Mrt";
	} else if (_number == 4) {
		return "Apr";
	} else if (_number == 5) {
		return "Mei";
	} else if (_number == 6) {
		return "Jun";
	} else if (_number == 7) {
		return "Jul";
	} else if (_number == 8) {
		return "Aug";
	} else if (_number == 9) {
		return "Sep";
	} else if (_number == 10) {
		return "Okt";
	} else if (_number == 11) {
		return "Nov";
	} else if (_number == 12) {
		return "Dec";
	} else {
		return "";
	}

};

facebookCalendar.renderData = function(data) {

	var _data = data;

	var htmlTemplate = document.querySelector('#template-calendar').innerHTML;
	var template = Handlebars.compile(htmlTemplate);
	var html = template(_data);
	document.querySelector('.calendar').innerHTML = html;

};

module.exports = facebookCalendar;

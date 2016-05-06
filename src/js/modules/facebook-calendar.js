var facebookCalendar = {};
var key = require('./key')

facebookCalendar.showCalendar = function() {

	window.dataReady = false;

	var data = facebookCalendar.getData()
	.then(function(response) {

		window.dataReady = true;

		var data = response;

		var reorderedData = facebookCalendar.reorderData(data);
		facebookCalendar.renderData(reorderedData);

	});

}

facebookCalendar.getData = function() {

	return new Promise(function(resolve, reject) { // Resolve = .then / Reject = .catch;

		// ToDo: Make authorisation in an exteral file

		var getAccesUrl = "https://graph.facebook.com/oauth/access_token?client_id=" + key.id + "&client_secret=" + key.secret + "&grant_type=client_credentials"
		facebookCalendar.apiCall(getAccesUrl)
		.then(function(response) {

			var accessToken = response;

			var url = "https://graph.facebook.com/" + key.user + "/?fields=events&" + response;
			facebookCalendar.apiCall(url)
			.then(function(response) {

				resolve(JSON.parse(response));

			})

		})

	});

}

facebookCalendar.createUrl = function() {

	var url = {
		base: "https://graph.facebook.com/v2.6/",
		pageId: "189056674477770",
		item: "events"
	}

	return url.base + url.pageId + "/" + url.item;

}

facebookCalendar.apiCall = function(url) {

	return new Promise(function(resolve, reject) { // Resolve = .then / Reject = .catch;

		var request = new XMLHttpRequest();

		request.onloadend = function(response) {

			resolve(request.response);

		}

		request.onerror = reject;

		request.open('GET', url, true);
		request.send();

	});

}

facebookCalendar.reorderData = function(data) {

	var _data = data;
	var items = _data.events.data;
	var nextItems = _data.events.paging.next;
	var fbEvents = [];
	var pastFbEvents = [];
	var justPastEvents;
	var lastEventsNumber = 3;

	items.forEach(function(item) {

		var _this = item;
		var gig = {};
		var gigData = _this.start_time;

		if ( _this.name ) {

			if ( _this.name.length > 20 ) {
				gig.title = facebookCalendar.cutString(_this.name, 27) + "...";
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

}

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

}

facebookCalendar.cutString = function(stringValue, amount) {

	var _amount = amount;
	var _stringValue = stringValue;
	var strLength = _stringValue.length;
	var slicedStr = _stringValue.slice(0, _amount);

	return slicedStr;

}

facebookCalendar.setMonth = function(number) {

	var _number = number;

	if ( _number == 01 ) {
		return "Jan";
	} else if ( _number == 02 ) {
		return "Feb";
	} else if ( _number == 03 ) {
		return "Mrt";
	} else if ( _number == 04 ) {
		return "Apr";
	} else if ( _number == 05 ) {
		return "Mei";
	} else if ( _number == 06 ) {
		return "Jun";
	} else if ( _number == 07 ) {
		return "Jul";
	} else if ( _number == 08 ) {
		return "Aug";
	} else if ( _number == 09 ) {
		return "Sep";
	} else if ( _number == 10 ) {
		return "Okt";
	} else if ( _number == 11 ) {
		return "Nov";
	} else if ( _number == 12 ) {
		return "Dec";
	}

}

facebookCalendar.renderData = function(data) {

	var _data = data;

	var htmlTemplate = document.querySelector('#template-calendar').innerHTML;
	var template = Handlebars.compile(htmlTemplate);
	var html = template(_data);
	document.querySelector('.calendar').innerHTML = html;

}

module.exports = facebookCalendar;

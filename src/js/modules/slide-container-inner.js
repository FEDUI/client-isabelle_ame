slideContainer = {};

slideContainer.start = function() {

	setTimeout(function() {

		var allHTML = slideContainer.getAllHTML();	
		slideContainer.addListeners(allHTML);
		slideContainer.onLoad();

	}, 800);

}

slideContainer.getAllHTML = function() {

	var video = document.querySelector('.main-content #video');
	var shows = document.querySelector('.main-content #shows');
	var contact = document.querySelector('.main-content #contact');
	
	var allHTML = {
		video: video.outerHTML,
		shows: shows.outerHTML,
		contact: contact.outerHTML
	};

	return allHTML;

}

slideContainer.set = function(e) {

	var newHash = e.target.hash.slice(1);
	var oldHash = window.location.hash.slice(1);
	var newValue;
	var oldValue;
	var newHTML = e.target.jsHtml;
	var container = document.querySelector('.main-content');

	var oldSection = document.querySelector('.main-content section');

	if ( newHash == "video" ) {
		newValue = 1;
	} else if ( newHash == "shows" ) {
		newValue = 2;
	} else if ( newHash == "contact" ) {
		newValue = 3;
	}

	if ( oldHash == "video" ) {
		oldValue = 1;
	} else if ( oldHash == "shows" ) {
		oldValue = 2;
	} else if ( oldHash == "contact" ) {
		oldValue = 3;
	}

	if ( oldValue > newValue ) {
		oldSection.classList.add('hide-main-item-left');
		oldSection.classList.remove('show-main-item-left');
		oldSection.classList.remove('show-main-item-right');

		setTimeout(function() {
			container.innerHTML = newHTML;
			var newSection = document.querySelector('.main-content section');
			newSection.classList.add('show-main-item-right');
		}, 300);
	}

	if ( oldValue < newValue ) {
		oldSection.classList.add('hide-main-item-right');
		oldSection.classList.remove('show-main-item-right');
		oldSection.classList.remove('show-main-item-left');

		setTimeout(function() {
			container.innerHTML = newHTML;
			var newSection = document.querySelector('.main-content section');
			newSection.classList.add('show-main-item-left');
		}, 300);	
	}

	window.location.hash = newHash;

	e.preventDefault();
}

slideContainer.addListeners = function(allHTML) {

	var _allHTML = allHTML;

	var menuLinks = document.querySelectorAll('.main-menu .stay');
	Array.prototype.forEach.call(menuLinks, function(link) {

		link.addEventListener('click', slideContainer.set, false);

		var linkId = link.hash.slice(1);
		if ( linkId == "video" ) {
			link.jsHtml = _allHTML.video;
		} else if ( linkId == "shows" ) {
			link.jsHtml = _allHTML.shows;
		} else if ( linkId == "contact" ) {
			link.jsHtml = _allHTML.contact;
		}

	});

}

slideContainer.onLoad = function() {

	var allItems = slideContainer.getAllHTML();
	var hash = window.location.hash.slice(1);
	var container = document.querySelector('.main-content');

	if ( hash == "video" ) {
		container.innerHTML = allItems.video;
	} else if ( hash == "shows" ) {
		container.innerHTML = allItems.shows;
	} else if ( hash == "contact" ) {
		container.innerHTML = allItems.contact;
	}	

}

module.exports = slideContainer;
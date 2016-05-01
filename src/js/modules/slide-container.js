slideContainer = {};

slideContainer.start = function() {

	var menuLinks = document.querySelectorAll('.main-menu .stay');
	var containerWidth = slideContainer.getContainerWidth();
	var hash = slideContainer.getHash();

	slideContainer.addEventListeners(menuLinks);
	slideContainer.setJsClass();

}

slideContainer.set = function(e) {

	var _e = e;
	var elTarget = _e.target.hash.slice(1); // cut of the #

	var menuItems = slideContainer.getAllItems();
	Array.prototype.forEach.call(menuItems, function(item) {

		var itemId = item.id;

		if (elTarget != itemId ) {
			slideContainer.hideItem(item);
		} else {
			slideContainer.showItem(item);
		}

	});


	_e.preventDefault();
}

slideContainer.getAllItems = function() {

	return document.querySelectorAll('.main-content section');

}

slideContainer.getHash = function() {

	if ( window.location.hash ) {
		return window.location.hash;
	}

}

slideContainer.hideItem = function(item) {

	var _item = item;
	_item.classList.add('hide-main-item');
	_item.classList.remove('show-main-item');

}

slideContainer.showItem = function(item) {

	var _item = item;
	_item.classList.add('show-main-item');
	_item.classList.remove('hide-main-item');

}

slideContainer.addEventListeners = function(links) {

	var _links = links;

	Array.prototype.forEach.call(_links, function(link) {

		link.addEventListener('click', slideContainer.set, false);

	});

}

slideContainer.getContainerWidth = function() {

	var container = document.querySelector('.main-content');
	return container.offsetWidth;

}

slideContainer.setJsClass = function() {

	var menuItems = slideContainer.getAllItems();
	Array.prototype.forEach.call(menuItems, function(item) {

		item.classList.add('js-set');

	});

};

module.exports = slideContainer;


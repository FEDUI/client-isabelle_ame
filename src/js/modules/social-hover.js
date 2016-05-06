var socialHover = {};
var paragInner = document.querySelector('.message span');
var paragAni = document.querySelector('.message');

socialHover.set = function() {

	var links = document.querySelectorAll('.social-bar--item');

	Array.prototype.forEach.call(links, function(link) {
		link.addEventListener('mouseenter', socialHover.enter, false);
		link.addEventListener('mouseleave', socialHover.leave, false);
	});
	
}

socialHover.enter = function(e) {
	
	var id = e.target.id.slice(5, e.target.id.length);
	var message = socialHover.getMessage(id);
	socialHover.showMessage(message);
	socialHover.open();

};
socialHover.leave = function(e) {

	socialHover.close();

};

socialHover.getMessage = function(id) {
	
	var _id = id;

	if( _id == "facebook" ) {
		return "Follow me on Facebook";
	} else if ( _id == "twitter" ) {
		return "Read my tweets";
	} else if ( _id == "itunes" ) {
		return "Listen to my music";
	} else if ( _id == "instagram" ) {
		return "Watch my pictures";
	}  else if ( _id == "youtube" ) {
		return "Watch my clips";
	}

};

socialHover.showMessage = function(message) {

	var _message = message;
	paragInner.innerHTML = _message;

};

socialHover.open = function() {
	paragAni.classList.add('open');
	paragAni.classList.remove('close');
}
socialHover.close = function() {
	paragAni.classList.add('close');
	paragAni.classList.remove('open');
}

module.exports = socialHover;
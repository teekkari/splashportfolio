// Vanilla JavaScript Scroll to Anchor
// credit https://perishablepress.com/vanilla-javascript-scroll-anchor/

(function() {
	scrollTo();
})();

function scrollTo() {
	const links = document.querySelectorAll('.sscroll');
	links.forEach(each => (each.onclick = scrollAnchors));
}

function scrollAnchors(e, respond = null) {
	const distanceToTop = el => Math.floor(el.getBoundingClientRect().top);
	e.preventDefault();
	var targetID = (respond) ? respond.getAttribute('href') : this.getAttribute('href');
	const targetAnchor = document.querySelector(targetID);
	if (!targetAnchor) return;
	const originalTop = distanceToTop(targetAnchor);
	window.scrollBy({ top: originalTop, left: 0, behavior: 'smooth' });
	const checkIfDone = setInterval(function() {
		const atBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2;
		if (distanceToTop(targetAnchor) === 0 || atBottom) {
			targetAnchor.tabIndex = '-1';
			targetAnchor.focus();
			window.history.pushState('', '', targetID);
			clearInterval(checkIfDone);
		}
	}, 100);
}

function toggleBurgerMenu() {
	const headerElement = document.getElementById('header');
	const burgerElement = document.getElementById('burger-menu-toggle');
	if (headerElement.clientHeight < headerElement.scrollHeight) {
		headerElement.style.height = headerElement.scrollHeight + 'px';
		burgerElement.style.transform = 'rotate(270deg)';
	} else {
		headerElement.style.height = '120px';
		burgerElement.style.transform = 'rotate(0deg)';
	}
}


/* SETUP */
window.addEventListener('DOMContentLoaded', (event) => {
	document.getElementById('burger-menu-toggle').onclick = toggleBurgerMenu;
});


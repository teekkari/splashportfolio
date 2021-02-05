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

const loadingSvg = '<svg class="animate-spin" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm8 12c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8zm-19 0c0-6.065 4.935-11 11-11v2c-4.962 0-9 4.038-9 9 0 2.481 1.009 4.731 2.639 6.361l-1.414 1.414.015.014c-2-1.994-3.24-4.749-3.24-7.789z"/></svg>';
function sendContactForm(event) {
	event.preventDefault();

	if (document.getElementById('form-hunaja').checked) {
		return;
	}
	
	const submitBtn = event.target;
	const sentMsg = document.getElementById('contact-sent');

	submitBtn.disabled = true;
	submitBtn.innerHTML = loadingSvg;

	const formEmailElem = document.getElementById('form-email');
	const formNameElem = document.getElementById('form-name');
	const formBodyElem = document.getElementById('form-body');

	const postData = new FormData();
	postData.append('email', formEmailElem.value);
	postData.append('name', formNameElem.value);
	postData.append('body', formBodyElem.value);

	fetch("https://app.99inbound.com/api/e/j036SLgt", {
		method: "POST", 
		body: postData
	  }).then(res => {
			submitBtn.classList.add('animate-pop-out');

			setTimeout( () => {
				submitBtn.remove();
				sentMsg.classList.add('animate-pop-in');
			}, 300);
		});
}


/* SETUP */
window.addEventListener('DOMContentLoaded', (event) => {
	document.getElementById('burger-menu-toggle').onclick = toggleBurgerMenu;
	document.getElementById('contact-submit').onclick = sendContactForm;
});


'use strict';
const menu = document.querySelector('.burger-menu');

document.querySelector('.burger').addEventListener('click', () => {
	menu.style.display = 'flex';
});
menu.addEventListener('click', (e) => {
	const target = e.target;
	if (target.matches('.close-btn') || target.tagName === 'A') {
		menu.style.display = 'none';
	}
});
document.querySelector('.header__search-btn').addEventListener('click', (e) => {
	e.preventDefault();
});

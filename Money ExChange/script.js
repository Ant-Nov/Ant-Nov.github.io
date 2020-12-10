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

const currency = document.querySelectorAll('.currency-reserve__currency'),
	leftSide = [currency[0], currency[1], currency[4], currency[5]],
	rightSide = [currency[2], currency[3], currency[6], currency[7]];

const animate = (side) => {
	let anim;
	anim = side === leftSide ? 'Left' : 'Right';

	side.forEach((item) => {
		item.classList.add('wow');
		item.classList.add('animate__animated');
		item.classList.add(`animate__fadeIn${anim}`);
	});
};
animate(leftSide);
animate(rightSide);

const advantage = document.querySelectorAll('.advantage');
const [left, center, right] = advantage;

const animateAdv = (side) => {
	let anim;
	anim = side === left ? 'Left' : side === right ? 'Right' : 'Up';

	side.classList.add('wow');
	side.classList.add('animate__animated');
	side.classList.add(`animate__slideIn${anim}`);
};
animateAdv(left);
animateAdv(center);
animateAdv(right);

const service = document.querySelector('.service__content');

service.classList.add('wow');
service.classList.add('animate__animated');
service.classList.add('animate__fadeInBottomRight');

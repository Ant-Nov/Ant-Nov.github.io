document.addEventListener('DOMContentLoaded', () => {
	const btnPlay = document.querySelector('.video__btn-play'),
		videoPlayer = document.querySelector('.video__player');

	btnPlay.addEventListener('click', () => {
		videoPlayer.style.cssText = `
		z-index: 7;
		`;
	});

	const burgerBtn = document.querySelector('.burger'),
		burgerMenu = document.querySelector('.burger-menu');

	burgerBtn.addEventListener('click', () => {
		burgerMenu.style.display = 'flex';

		burgerMenu.addEventListener('click', e => {
			const target = e.target;

			if (target.matches('.close-btn') || target.nodeName === 'A') {
				burgerMenu.style.display = 'none';
			}
		});
	});
});

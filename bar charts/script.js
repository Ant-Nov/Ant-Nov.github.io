'use strict';

const chart = document.querySelector('.charts'),
	values = document.querySelector('.values'),
	indexes = document.querySelector('.indexes');

const arr = [5, 8, 2, 1, 15, 2, 3, 5, 9, 11, 10, 4, 3, 14, 1, 7, 10, 3, 2, 13],
	maxVal = Math.max(...arr),
	length = arr.length;

chart.style.cssText = `
grid-template-columns: repeat(${length * 2 + 1}, 1fr);
grid-template-rows: repeat(${maxVal + 2}, 1fr);
`;

values.style.cssText = `
grid-template-columns: 1fr;
grid-template-rows: repeat(${maxVal + 2}, 1fr);
`;

indexes.style.cssText = `
grid-template-columns: repeat(${length * 2 + 1}, 1fr);
grid-template-rows: 1fr;
`;

for (let i = maxVal + 2; i > 0; i--) {
	const div = document.createElement('div');
	div.classList.add('value');

	if (i % 2 === 0) {
		div.innerHTML = `<div>${i}</div>`;
	}

	values.append(div);
}

let columnStart = 2,
	columnEnd;

for (let i = 0; i < arr.length; i++) {
	columnEnd = columnStart + 1;

	const div = document.createElement('div');
	div.classList.add(`div${i}`);
	div.style.cssText = `
    grid-area: ${maxVal + 3 - arr[i]} / ${columnStart} / ${maxVal + 3} / ${columnEnd};
    `;

	if (arr[i] <= 5) {
		div.style.background = 'green';
	} else if (arr[i] <= 10) {
		div.style.background = 'yellow';
	} else {
		div.style.background = 'red';
	}

	chart.append(div);

	const index = document.createElement('p');
	index.textContent = i;
	index.style.cssText = `
    grid-area: ${maxVal + 3 - arr[i]} / ${columnStart} / ${maxVal + 3} / ${columnEnd};
    `;

	indexes.append(index);

	columnStart += 2;
}

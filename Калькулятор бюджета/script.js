'use strict';

const isNumber = (n) => !isNaN(parseFloat(n)) && isFinite(parseFloat(n));

const calc = document.getElementById('start');
const resetAll = document.getElementById('cancel');
const incAdd = document.getElementsByTagName('button')[0];
const expAdd = document.getElementsByTagName('button')[1];
const depCheck = document.querySelector('#deposit-check');
const addIncItem1 = document.querySelectorAll('.additional_income-item')[0];
const addIncItem2 = document.querySelectorAll('.additional_income-item')[1];
const budMonVal = document.getElementsByClassName('budget_month-value')[0];
const budDayVal = document.getElementsByClassName('budget_day-value')[0];
const expMonVal = document.getElementsByClassName('expenses_month-value')[0];
const addIncVal = document.getElementsByClassName('additional_income-value')[0];
const addExpVal = document.getElementsByClassName('additional_expenses-value')[0];
const incPerVal = document.getElementsByClassName('income_period-value')[0];
const tarMonVal = document.getElementsByClassName('target_month-value')[0];
const salAm = document.querySelector('.salary-amount');
const expTitl = document.querySelectorAll('.expenses-title')[1];
const expAmo = document.querySelector('.expenses-amount');
const addExpIt = document.querySelector('.additional_expenses-item');
const depAm = document.querySelector('.deposit-amount');
const depPer = document.querySelector('.deposit-percent');
const targAm = document.querySelector('.target-amount');
const perSel = document.querySelector('.period-select');
const perAmo = document.querySelector('.period-amount');
const incTitl = document.querySelectorAll('.income-title')[1];
const incAmo = document.querySelector('.income-amount');
const depBank = document.querySelector('.deposit-bank');
let expensesItems = document.querySelectorAll('.expenses-items');
let incomeItems = document.querySelectorAll('.income-items');
const allResult = document.querySelectorAll('.result-total');
const titles = document.querySelectorAll('span[class="title"]');

class AppData {
	constructor() {
		this.budget = 0;
		this.income = {};
		this.addIncome = [];
		this.expenses = {};
		this.addExpenses = [];
		this.deposit = false;
		this.pecentDeposit = 0;
		this.moneyDeposit = 0;
		this.budgetDay = 0;
		this.budgetMonth = 0;
		this.incomeMonth = 0;
		this.expensesMonth = 0;
		this.storage = [];
	}

	start() {
		this.budget = +salAm.value;

		this.getExpenses();
		this.getExpensesMonth();
		this.getIncome();
		this.getTargetMonth();
		this.getInfoDeposit();
		this.getAddIncome();
		this.getAddExpenses();
		this.getBudget();
		this.calcSavedMoney();

		this.showResult();

		this.createStorage();
		this.cookiesInMemory();
	}

	showResult() {
		const inputs = document.querySelectorAll(
			'input[placeholder="Наименование"], input[placeholder="название"], input[placeholder="Сумма"], input[placeholder="Процент"]'
		);
		inputs.forEach((item) => {
			item.disabled = true;
		});
		depBank.disabled = true;

		budMonVal.value = this.budgetMonth;
		budDayVal.value = this.budgetDay;
		expMonVal.value = this.expensesMonth;
		addExpVal.value = this.addExpenses.join(', ');
		addIncVal.value = this.addIncome.join(', ');
		tarMonVal.value = this.getTargetMonth();
		perSel.addEventListener('input', () => {
			this.calcSavedMoney();
			incPerVal.value = Math.round(this.calcSavedMoney());
		});
		incPerVal.value = Math.round(this.calcSavedMoney());
	}

	addExpensesBlock() {
		const expItemsClone = expensesItems[0].cloneNode(true);
		expAdd.before(expItemsClone);
		expItemsClone.children[0].value = '';
		expItemsClone.children[1].value = '';
		this.checkVal();
		expensesItems = document.querySelectorAll('.expenses-items');
		if (expensesItems.length === 3) {
			expAdd.style.display = 'none';
		}
	}

	getExpenses() {
		expensesItems.forEach((item) => {
			const itemExp = item.querySelector('.expenses-title').value;
			const itemAmo = item.querySelector('.expenses-amount').value;
			if (itemExp.value !== '' && itemAmo.value !== '') {
				this.expenses[itemExp] = itemAmo * 1;
			}
		});
	}

	addIncomeBlock() {
		const incItemClone = incomeItems[0].cloneNode(true);
		incAdd.before(incItemClone);
		incItemClone.children[0].value = '';
		incItemClone.children[1].value = '';
		this.checkVal();
		incomeItems = document.querySelectorAll('.income-items');
		if (incomeItems.length === 3) {
			incAdd.style.display = 'none';
		}
	}

	getIncome() {
		incomeItems.forEach((item) => {
			const incTitle = item.querySelector('.income-title').value;
			const incAmount = item.querySelector('.income-amount').value;
			if (incTitle.value !== '' && incAmount.value !== '') {
				this.income[incTitle] = incAmount * 1;
			}
		});
		for (const key in this.income) {
			this.incomeMonth += +this.income[key];
		}
	}

	getAddExpenses() {
		const addExp = addExpIt.value.split(', ');
		addExp.forEach((item) => {
			item = item.trim();
			if (item !== '') {
				this.addExpenses.push(item);
			}
		});
	}

	getAddIncome() {
		const addIncItem = document.querySelectorAll('.additional_income-item');
		addIncItem.forEach((item) => {
			const itemValue = item.value.trim();
			if (itemValue !== '') {
				this.addIncome.push(itemValue);
			}
		});
	}

	getExpensesMonth() {
		for (const val in this.expenses) {
			this.expensesMonth += this.expenses[val] * 1;
		}

		return this.expensesMonth;
	}

	getBudget() {
		const monthDeposit = (this.pecentDeposit / 100) * this.moneyDeposit;
		this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
		this.budgetDay = Math.floor(this.budgetMonth / 30);
	}

	getTargetMonth() {
		return Math.ceil(targAm.value.trim() / this.budgetMonth);
	}

	getStatusIncome() {
		if (this.budgetDay >= 1200) {
			console.log('У вас высокий уровень дохода');
		} else if (this.budgetDay < 1200 && this.budgetDay > 600) {
			console.log('У вас средний уровень дохода');
		} else if (this.budgetDay <= 600 && this.budgetDay > 0) {
			console.log('У вас низкий уровень дохода');
		} else {
			console.log('Что-то пошло не так');
		}
	}

	periodSelect() {
		perAmo.innerHTML = perSel.value;
	}

	calcSavedMoney() {
		return this.budgetMonth * perSel.value;
	}

	checkVal() {
		const regExp = /[а-яё,\s]/gi;

		const txtItem = document.querySelectorAll('input[placeholder="Наименование"], input[placeholder="название"]');
		txtItem.forEach((item) => {
			item.addEventListener('input', () => {
				if (regExp.test(item.value) === false || isNaN(item.value) === false) {
					item.value = '';
				}
			});
		});

		const numItem = document.querySelectorAll('input[placeholder="Сумма"]');

		numItem.forEach((item) => {
			item.addEventListener('input', () => {
				if (!isNumber(item.value)) {
					item.value = '';
				}
			});
		});
	}

	resetApp() {
		this.budget = 0;
		this.income = {};
		this.addIncome = [];
		this.expenses = {};
		this.addExpenses = [];
		this.deposit = false;
		this.pecentDeposit = 0;
		this.moneyDeposit = 0;
		this.budgetDay = 0;
		this.budgetMonth = 0;
		this.incomeMonth = 0;
		this.expensesMonth = 0;
		this.storage = [];

		localStorage.removeItem('finance');
		this.deleteAllCookies();

		const allInputs = document.querySelectorAll('input[type="text"]');

		const range = document.querySelector('input[type="range"]');
		range.value = 1;
		this.periodSelect();

		const depositCheck = document.getElementById('deposit-check');
		depositCheck.checked = false;
		this.deposit = false;
		depPer.style.display = 'none';
		depAm.style.display = 'none';
		depBank.style.display = 'none';
		depPer.value = '';
		depAm.value = '';
		depBank.value = '';

		incomeItems = document.querySelectorAll('.income-items');
		for (let i = 1; i < incomeItems.length; i++) {
			incomeItems[i].remove();
		}
		incAdd.style.display = 'inline-block';

		expensesItems = document.querySelectorAll('.expenses-items');
		for (let i = 1; i < expensesItems.length; i++) {
			expensesItems[i].remove();
		}
		expAdd.style.display = 'inline-block';

		allInputs.forEach((item) => {
			item.value = '';
			item.disabled = false;
		});
		depBank.disabled = false;

		resetAll.style.display = 'none';
		calc.style.display = 'inline-block';

		calc.disabled = true;
		calc.style.cursor = 'not-allowed';
	}

	getInfoDeposit() {
		if (this.deposit === true) {
			this.pecentDeposit = depPer.value;
			this.moneyDeposit = depAm.value;
		}
	}

	changePerc() {
		const valSel = this.value;
		if (valSel === 'other') {
			depPer.style.display = 'inline-block';
			depPer.value = '';
			depPer.addEventListener('change', () => {
				if (!isNumber(depPer.value) || depPer.value < 0 || depPer.value > 100) {
					alert('Введите корректное значение в поле проценты');
					depPer.value = '';
					calc.disabled = true;
					calc.style.cursor = 'not-allowed';
				} else {
					calc.disabled = false;
					calc.style.cursor = 'pointer';
				}
			});
		} else {
			depPer.value = valSel;
			depPer.style.display = 'none';
		}
	}

	depositHandler() {
		if (depCheck.checked) {
			depBank.style.display = 'inline-block';
			depAm.style.display = 'inline-block';
			this.deposit = true;
			depBank.addEventListener('change', this.changePerc);
		} else {
			depBank.style.display = 'none';
			depAm.style.display = 'none';
			depBank.value = '';
			depAm.value = '';
			this.deposit = false;
			depBank.removeEventListener('change', this.changePerc);
		}
	}

	createStorage() {
		for (let i = 0; i < titles.length; i++) {
			const infoObj = {
				[titles[i].innerText]: allResult[i].value,
			};
			this.storage.push(infoObj);
		}
		localStorage.setItem('finance', JSON.stringify(this.storage));
	}

	getLocStor() {
		const getItems = localStorage.getItem('finance');
		if (getItems) {
			this.storage = JSON.parse(getItems);
			for (let i = 0; i < titles.length; i++) {
				allResult[i].value = Object.values(this.storage[i]);
			}
			const inputs = document.querySelectorAll(
				'input[placeholder="Наименование"], input[placeholder="название"], input[placeholder="Сумма"], input[placeholder="Процент"]'
			);
			inputs.forEach((item) => {
				item.disabled = true;
			});
			depBank.disabled = true;

			calc.style.display = 'none';
			resetAll.style.display = 'inline-block';
			resetAll.addEventListener('click', () => {
				this.resetApp();
			});
		}
		setInterval(() => {
			this.checkCookies();
		}, 100);
	}

	checkCookies() {
		const cookies = document.cookie.split(';');
		if (cookies.length > 1 && cookies.length < 8) {
			console.log(cookies);
			localStorage.removeItem('finance');
			this.deleteAllCookies();
			this.resetApp();
		}
	}

	cookiesInMemory() {
		for (let i = 0; i < titles.length; i++) {
			this.setCookie(titles[i].innerText, allResult[i].value);
		}
		this.setCookie('isLoad', true);
	}

	setCookie(key, value, path, domain, secure) {
		let cookieStr = `${encodeURI(key)}=${encodeURI(value)}`;
		const date = new Date().toUTCString();
		const oneYear = parseInt(date.split('')[15] + 1).toString();
		const newDate = date.split('');
		newDate.splice(15, 1, oneYear);
		const dd = newDate.join('');
		cookieStr += `; expires=${dd}`;

		cookieStr += path ? `; path=${encodeURI(path)}` : '';
		cookieStr += domain ? `; domain=${encodeURI(domain)}` : '';
		cookieStr += secure ? `; secure` : '';

		document.cookie = cookieStr;
	}

	deleteCookie(name) {
		document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
	}

	deleteAllCookies() {
		const cookies = document.cookie.split(';');

		cookies.forEach((item) => {
			const eqPos = item.indexOf('=');
			const name = eqPos > -1 ? item.slice(0, eqPos) : item;
			document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
		});
	}

	events() {
		this.checkVal();
		expAdd.addEventListener('click', this.addExpensesBlock.bind(this));
		incAdd.addEventListener('click', this.addIncomeBlock.bind(this));
		perSel.addEventListener('input', this.periodSelect.bind(this));
		depCheck.addEventListener('change', this.depositHandler.bind(this));

		calc.disabled = true;
		calc.style.cursor = 'not-allowed';
		calc.addEventListener('click', () => {
			this.start();
			calc.style.display = 'none';
			resetAll.style.display = 'inline-block';
			resetAll.addEventListener('click', () => {
				this.resetApp();
			});
		});
		salAm.addEventListener('input', () => {
			if (!isNumber(salAm.value)) {
				calc.disabled = true;
				calc.style.cursor = 'not-allowed';
			} else {
				calc.disabled = false;
				calc.style.cursor = 'pointer';
			}
		});
	}
}
const appData = new AppData();
appData.events();
appData.getLocStor();

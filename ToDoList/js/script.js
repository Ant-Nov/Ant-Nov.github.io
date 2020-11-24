'use strict';

class Todo {
	constructor(form, input, todoList, todoCompl, addBtn) {
		this.form = document.querySelector(form);
		this.addBtn = document.querySelector(addBtn);
		this.input = document.querySelector(input);
		this.todoList = document.querySelector(todoList);
		this.todoCompl = document.querySelector(todoCompl);
		this.todoData = new Map(JSON.parse(localStorage.getItem('toDoList')));
	}

	addToStorage() {
		localStorage.setItem('toDoList', JSON.stringify([...this.todoData]));
	}

	addTodo(event) {
		event.preventDefault();
		if (this.input.value.trim()) {
			const newTodo = {
				value: this.input.value,
				completed: false,
				key: this.generateKey(),
			};
			this.todoData.set(newTodo.key, newTodo);
			this.addToStorage();
			this.renderToDo();
			this.input.value = '';
			this.addBtn.disabled = true;
			this.addBtn.style.cursor = 'not-allowed';
		}
	}

	renderToDo() {
		this.todoList.textContent = '';
		this.todoCompl.textContent = '';
		this.todoData.forEach(this.createItem, this);
	}

	createItem(item) {
		const li = document.createElement('li');
		li.classList.add('todo-item');
		li.key = item.key;
		li.insertAdjacentHTML(
			'beforeend',
			`
				<span class="text-todo">${item.value}</span>
                <div class="todo-buttons">
                    <button class="todo-edit"></button>
					<button class="todo-remove"></button>
					<button class="todo-complete"></button>
				</div>
            `
		);
		if (item.completed === false) {
			this.todoList.append(li);
		} else {
			this.todoCompl.append(li);
		}
	}

	generateKey() {
		let text = '';
		const possible =
			'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

		for (let i = 0; i < 5; i++) {
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		return text;
	}

	editItem(target, item) {
		target
			.closest('.todo-item')
			.children[0].setAttribute('contenteditable', 'true');
		target.closest('.todo-item').children[0].focus();
		target.closest('.todo-item').children[0].addEventListener('blur', () => {
			item.value = target.closest('.todo-item').children[0].textContent;
			this.addToStorage();
			this.renderToDo();
		});
	}

	deleteItem(item, target) {
		let interval;
		let count = 0,
			opacity = 1,
			width = 1107.77783203125;
		const animate = () => {
			interval = requestAnimationFrame(animate);
			count += 10;
			opacity -= 0.02;
			width -= 10;
			if (count < 500 && opacity > 0) {
				target.style.left = count + 'px';
				target.style.opacity = opacity + '';
				target.style.width = width + 'px';
			} else {
				cancelAnimationFrame(interval);
				this.todoData.delete(item.key);
				this.addToStorage();
				this.renderToDo();
			}
		};
		interval = requestAnimationFrame(animate);
	}

	completedItem(item, target) {
		const animate = (boolean) => {
			let interval,
				counter = 0,
				opacity = 1;
			const animate = () => {
				interval = requestAnimationFrame(animate);
				if (boolean === true) {
					counter -= 2;
				} else {
					counter += 2;
				}
				opacity -= 0.02;
				if (counter < 300 && opacity > 0) {
					target.style.bottom = counter + 'px';
					target.style.opacity = opacity + '';
				} else {
					item.value = target.closest('.todo-item').children[0].textContent;
					cancelAnimationFrame(interval);
					item.completed = boolean;
					this.addToStorage();
					this.renderToDo();
				}
			};
			interval = requestAnimationFrame(animate);
		};
		if (item.completed === true) {
			animate(false);
		} else if (item.completed === false) {
			animate(true);
		}
	}

	handler() {
		const todoContainer = document.querySelector('.todo-container');
		todoContainer.addEventListener('click', (event) => {
			let target = event.target;
			this.todoData.forEach((item, i) => {
				if (target.closest('.todo-list')) {
					if (target.classList.contains('todo-edit')) {
						if (item.key === target.closest('.todo-item').key) {
							this.editItem(target, item);
						}
					}
					if (target.classList.contains('todo-remove')) {
						if (item.key === target.closest('.todo-item').key) {
							this.deleteItem(item, target.closest('.todo-item'));
						}
					} else if (target.classList.contains('todo-complete')) {
						if (item.key === target.closest('.todo-item').key) {
							this.completedItem(item, target.closest('.todo-item'));
						}
					}
				} else if (target.closest('.todo-completed')) {
					if (target.classList.contains('todo-edit')) {
						if (item.key === target.closest('.todo-item').key) {
							this.editItem(target, item);
						}
					}
					if (target.classList.contains('todo-remove')) {
						if (item.key === target.closest('.todo-item').key) {
							this.deleteItem(item, target.closest('.todo-item'));
						}
					} else if (target.classList.contains('todo-complete')) {
						if (item.key === target.closest('.todo-item').key) {
							this.completedItem(item, target.closest('.todo-item'));
						}
					}
				}
			});
		});
	}

	init() {
		this.addBtn.disabled = true;
		this.addBtn.style.cursor = 'not-allowed';
		this.input.addEventListener('input', () => {
			if (this.input.value === '') {
				this.addBtn.disabled = true;
				this.addBtn.style.cursor = 'not-allowed';
			} else {
				this.addBtn.disabled = false;
				this.addBtn.style.cursor = 'pointer';
			}
		});

		this.form.addEventListener('submit', this.addTodo.bind(this));
		this.renderToDo();
		this.handler();
	}
}

const todo = new Todo(
	'.todo-control',
	'.header-input',
	'.todo-list',
	'.todo-completed',
	'.header-button'
);
todo.init();

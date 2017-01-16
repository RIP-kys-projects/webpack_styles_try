
	'use strict';

	//import
	require('./menu.css');
	/* ошибка!, как я подключу fest сюда, чтобы было видно изнутри вебпака ?? Просто не видна изнутри window
	* и необходимо посмотреть, как работает fest, чтобы понимать, что нужно для правильной работы */
	console.log(window.fest);
	let _template = window.fest['./components/menu/menu.tmpl'];

	/**
	 * @class Menu
	 * Компонента "Меню"
	 */
	class Menu {

		/**
		 * @constructor
		 * @param  {Object} opts
		 */
		constructor ({el, data, onPick}) { // деструктуризация объекта
			this.el = el;
			this.data = data;
			this.onPick = onPick;

			this._initEvents();
		}

		setData (data) {
			this.data = data;
		}

		/**
		 * Добавляем элемент меню
		 * @param {Object} item
		 */
		addItem (item) {
			this.data.items.push(item);
			this.render();
		}

		/**
		 * Удаляем пункт меню из данных
		 * @param  {Object} removedItem
		 */
		removeItem (removedItem) {
			this.data.items = this.data.items.filter((item, index) => {
				return index !== removedItem.index;
			});
			this.render();
		}

		/**
		 * Создаем HTML
		 */
		render () {
			this.el.innerHTML = _template(this.data);
		}

		/**
		* Удаления элемента меню
		* @param  {HTMLElement} item
		* @private
		*/
		_onremove(item) {
			let index = parseInt(item.parentNode.dataset.index, 10);

			this.removeItem({
				index
			});
		}

		/**
		* Выбор элемента меню
		* @param  {HTMLElement} item
		*/
		_onpick(item) {
			this.onPick(item);
		}

		/**
		* Развешиваем события
		*/
		_initEvents() {
			this.el.addEventListener('click', this._onClick.bind(this));
		}

		/**
		* Клик в любую область меню
		* @param {Event} event
		* @private
		*/
		_onClick(event) {
			event.preventDefault();
			let item = event.target;

			try {
				this['_on' + item.dataset.action](item);
			} catch (e) {
				throw new Error(`Метод ${item.dataset.action} не определен!`);
			}

		}

	}

	// Export
	exports.Menu = Menu;

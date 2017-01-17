
	'use strict';


    require('./form.css');
	/**
	 * @class Form
	 * Компонента "Форма"
	 */
	class Form {

		/**
		 * @constructor
		 * @param  {Object} opts
		 */
		constructor({el, data}) {
			this.el = el;
			this.data = data;

			this.render();
			this._initEvents();
		}

		/**
		 * Создаем HTML
		 */
		render () {
			this.el.innerHTML = `
			<form class="form pure-form">
				<fieldset>
					<input class="form__input"
						type="url" name="href"
						required="required"
						placeholder="url"/>
					
					<input class="form__input"
						type="text" name="anchor"
						required="required"
						placeholder="anchor"/>
					<button class="form__btn pure-button" type="submit">
						Save
					</button>
					
				</fieldset>
			</form>`;
		}


		/**
		 * Получение элемента формы по имени
		 * @param  {string} name
		 * @return {HTMLElement}
		 */
		getField (name) {
			return this.el.querySelector(`[name="${name}"]`);
		}


		/**
		* Развешиваем события
		*/
		_initEvents () {
			this.el.addEventListener('submit', this._onSubmit.bind(this));
		}


		/**
		 * Подписываемся
		 * @param  {string}   name    
		 * @param  {Function} callback
		 */
		on (name, callback) {
			this.el.addEventListener(name, callback);
		}


		/**
		 * Создаем и диспатчим событие
		 * @param  {[type]} data [description]
		 * @return {[type]}      [description]
		 */
		trigger (name, data) {
			let widgetEvent = new CustomEvent(name, {
      			bubbles: true,
      			// detail - стандартное свойство CustomEvent для произвольных данных
      			detail: data
    		});

    		this.el.dispatchEvent(widgetEvent);
		}


		/**
		* Отправка данных формы
		* @param {Event} event
		* @private
		*/
		_onSubmit (event) {
			event.preventDefault();

			this.trigger('add', {
				href: this.getField('href').value,
				anchor: this.getField('anchor').value
			});

			event.target.reset();
		}

	}


	//export
	module.exports = Form;
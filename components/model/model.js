
	'use strict';

	class Model {
		constructor({resource, data = {}}) {
			this.resource = resource;
			this._handlers = {};

			this.setData(data);
		}

		setData (data) {
			this._data = data;
			this.trigger('update', this._data);
		}

		getData () {
			return this._data;
		}

		fetch () {
			this._makeRequset('GET', this.resource);
		}

		on (name, callback) {
			if (!this._handlers[name]) {
				this._handlers[name] = [];
			}

			this._handlers[name].push(callback);
		}

		trigger (name, data) {
			if (this._handlers[name]) {
				this._handlers[name].forEach(callback => callback(data));
			}
			
		}

		_makeRequset (method, resource) {
			let xhr = new XMLHttpRequest();
			xhr.open(method, resource, true);
			xhr.onreadystatechange = () => {
				if (xhr.readyState !== 4) {
					return;
				}

				if (xhr.status === 200) {
					let data = JSON.parse(xhr.responseText);

					this.trigger('fetch', xhr);
					this.setData(data);
				}
			};

			xhr.send();
		}
	}


	//export
	exports.Model = Model;

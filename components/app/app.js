(function () {
 	'use strict';

	//import
	let Menu = window.Menu;
	let Form = window.Form;
	let Model = window.Model;

	let menuModel = new Model({
		resource: '/data/menu.json',
		data: {}
	});

	let menu = new Menu({
		el: document.querySelector('.js-menu'),
		onPick (item) {
			console.log(item);
		},
		onRemove () {}
	});

	menuModel.on('update', data => {
		menu.setData(data);
		menu.render();
	});


	let form = new Form({
		el: document.querySelector('.js-form')
	});

	form.on('add', event => {
		menu.addItem(event.detail);
	});

	menuModel.fetch();



	//TODO: Сделать компоненту для нотификации о версии приложения
	let xhr = new XMLHttpRequest();
	xhr.open('GET', '/package.json', true);
	
	xhr.onreadystatechange = function (event) {
		if (xhr.readyState !== 4) {
			return;
		}

		if (xhr.status === 200) {
			console.log('App vesrion is: ', JSON.parse(xhr.responseText).version);
		}
	};

	xhr.send();

})();
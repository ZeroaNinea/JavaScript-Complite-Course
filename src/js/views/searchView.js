import View from './View.js';

class SearchView extends View {
	_parentElement = document.querySelector('.search');
	_message = 'Search field is empty! Please write something! 😖';

	getQuery() {
		const query = this._parentElement.querySelector('.search__field').value;
		this._clearInput();
		return query;
	}

	_clearInput() {
		this._parentElement.querySelector('.search__field').value = '';
	}

	addHandlerSearch(handler) {
		this._parentElement.addEventListener('submit', e => {
			e.preventDefault();

			// This part of the code I wrote by myself, because that blogger didn't do it.
			const searchValue = e.target.querySelector('.search__field').value;
			if(searchValue === '') {
				this._parentElement = document.querySelector('.results');
				setTimeout(() => this.renderError(this._message), 100);
				this.renderSpinner();

				return;
			}

			this._parentElement = document.querySelector('.search');
			handler();
		});
	}
}

export default new SearchView();
// this file will handle the UI aspects
class Main {
	constructor() {
		this.setupEventListeners();
	}
	setupEventListeners() {
		const buttonEl = document.querySelector('[name="search"]');
		buttonEl.addEventListener('click', this.handleSearch);
		const bodyEl = document.querySelector('body');
		bodyEl.addEventListener('got-results', this.handleResults);
		bodyEl.addEventListener('got-error', this.handleSearchError);
	}

	handleSearch = (event) => {
		event.preventDefault();

		const restaurantEl = document.querySelector('[name="Restaurant"]');
		const restaurantTerm = restaurantEl.value;

		const locationEl = document.querySelector('[name="location"]');
		const locationTerm = locationEl.value;

		const sortEl = document.querySelector('[name="sort-by"]');
		const sortTerm = sortEl.value;

		var priceEl = document.querySelectorAll('[name="price"]:checked');
		var prices = [];
		for (var x = 0, l = priceEl.length; x < l; x++) {
			prices.push(priceEl[x].value);
		}
		if (priceEl.length === 0) {
			priceTerm === 0;
		} else {
			var priceTerm = prices.join(', ');
		}
		const openEl = document.querySelector('[name="open"]');
		const openBo = openEl.checked;

		console.log(
			'searching...',
			restaurantTerm,
			locationTerm,
			sortTerm,
			priceTerm,
			openBo
		);
		const api = new YelpApi();
		if (locationTerm === '') {
			alert('You must at least enter a location');
		} else {
			api.businessSearch({
				term: restaurantTerm,
				location: locationTerm,
				sort_by: sortTerm,
				price: priceTerm,
				open_now: openBo,
			});
		}
	};
	handleResults(event) {
		const results = event.detail;
		console.log(results);

		const allReviewsEl = document.querySelector('.results');
		allReviewsEl.textContent = '';

		for (let r in results) {
			const review = results[r];
			// Main parents
			const reviewEl = document.createElement('li');
			allReviewsEl.appendChild(reviewEl);

			const reviewContainer = document.createElement('div');
			reviewContainer.setAttribute('class', 'review-container');
			reviewEl.appendChild(reviewContainer);

			const infoContainer = document.createElement('div');
			infoContainer.setAttribute('class', 'info-container');
			reviewContainer.appendChild(infoContainer);

			const headingContainer = document.createElement('div');
			headingContainer.setAttribute('class', 'heading-container');
			infoContainer.appendChild(headingContainer);

			const catContainer = document.createElement('div');
			catContainer.setAttribute('class', 'cat-container');
			infoContainer.appendChild(catContainer);

			const statsContainer = document.createElement('div');
			statsContainer.setAttribute('class', 'stats-container');
			headingContainer.appendChild(statsContainer);

			// end Main Parents

			// Children and Grandchildren of headingContainer

			const reviewLinkEl = document.createElement('a');
			reviewLinkEl.setAttribute('href', review.url);
			reviewLinkEl.setAttribute('target', '_blank');
			headingContainer.appendChild(reviewLinkEl);

			const nameEl = document.createElement('h2');
			reviewLinkEl.appendChild(nameEl);
			nameEl.textContent = review.name;

			const ratingEl = document.createElement('span');
			statsContainer.appendChild(ratingEl);
			ratingEl.innerText = review.rating + '⭐';

			const priceEl = document.createElement('span');
			priceEl.setAttribute('class', 'pricing');
			statsContainer.appendChild(priceEl);
			priceEl.innerText = review.price;

			// end Children and Grandchildren of headingContainer

			// reviewContainer's children
			const imageEl = document.createElement('img');
			imageEl.setAttribute('src', review.image_url);
			// imageEl.setAttribute('class', 'yelp-image');
			reviewContainer.appendChild(imageEl);
			//end reviewContainer's children

			//infoContainers  children
			const categoriesEl = document.createElement('span');
			categoriesEl.innerText = review.categories
				.map((cat) => cat.title)
				.join('\n');
			catContainer.appendChild(categoriesEl);

			const phoneEl = document.createElement('span');
			infoContainer.appendChild(phoneEl);
			phoneEl.innerText = review.display_phone + ' ';

			const locationEl = document.createElement('span');
			infoContainer.appendChild(locationEl);
			locationEl.textContent = review.location.display_address;

			const transactionEl = document.createElement('span');
			infoContainer.appendChild(transactionEl);
			transactionEl.innerText = 'Available for: ' + review.transactions;
			//end infoContainers  children
		}
	}
}
new Main();

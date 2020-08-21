class YelpApi {
	API_URL_BASE = 'https://circuslabs.net/proxies/yelp-fusion-proxy/';

	API_KEY =
		'WZRiX_kbD4sEudRyWSV8P17c2O_qM2oEcuSD75I31YlDZWH7lrORFnBbgpE1dYUk8pZ1zm75H4WsgTwci4A4TvUIBvNdEubCnXuaT-RfH1FIfwTJdxKJRl5bTFEsX3Yx';

	businessSearch(parameters) {
		axios
			.get(this.API_URL_BASE, {
				params: {
					_ep: '/businesses/search',

					...parameters,
				},
				headers: {
					Authorization: `Bearer ${this.API_KEY}`,
				},
			})
			.then(this.handleResponse)
			.catch(this.handleError);
	}

	handleResponse(response) {
		console.log('response', response);
		const event = new CustomEvent('got-results', {
			detail: response.data.businesses,
		});
		document.querySelector('body').dispatchEvent(event);
	}
	handleError(error) {
		console.log('error', error);
		const event = new CustomEvent('got-error', { detail: error });
		document.querySelector('body').dispatchEvent(event);
	}
}

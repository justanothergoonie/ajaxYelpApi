class GoogleApi {
	markers = [];
	map = null;
	bounds = new google.maps.LatLngBounds();
	constructor() {
		this.setupMap();
		const buttonEl = document.querySelector('[name="search"]');
		buttonEl.addEventListener('click', this.clearMap);
		const bodyEl = document.querySelector('body');
		bodyEl.addEventListener('got-results', this.handleResults);
	}
	setupMap() {
		var circusLatLng = { lat: 33.813242, lng: -84.361712 };
		this.map = new google.maps.Map(document.getElementById('map'), {
			zoom: 12,
			center: circusLatLng,
		});

		// this.markers.push(marker);
	}
	handleResults = (event) => {
		const results = event.detail;
		console.log('showing results from map', results);

		for (let m in results) {
			const business = results[m];
			const businessMarker = {
				lat: business.coordinates.latitude,
				lng: business.coordinates.longitude,
			};

			// console.log(this.map);

			var marker = new google.maps.Marker({
				position: businessMarker,
				map: this.map,
				title: business.name,
			});
			var loc = new google.maps.LatLng(
				marker.position.lat(),
				marker.position.lng()
			);
			var contentString =
				business.name +
				'<br/>' +
				business.rating +
				' ⭐' +
				'<br/>' +
				business.price +
				'<br/>' +
				business.display_phone +
				'<br/>' +
				business.location.display_address;
			// console.log(contentString);

			var infowindow = new google.maps.InfoWindow({
				content: contentString,
			});
			console.log(infowindow);

			this.markers.forEach((marker) => {
				marker.addListener('click', () => {
					infowindow.open(this.map, marker);
				});
			});
			this.bounds.extend(loc);
			this.markers.push(marker);
			this.map.fitBounds(this.bounds);
			this.map.panToBounds(this.bounds);
		}
	};
	clearMap = () => {
		this.markers.forEach((marker) => {
			marker.setMap(null);
		});
		this.markers = [];
	};
}
function initMap() {
	new GoogleApi(document.getElementById('#map'));
}

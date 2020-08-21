"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var GoogleApi = /*#__PURE__*/function () {
  function GoogleApi() {
    var _this = this;

    _classCallCheck(this, GoogleApi);

    _defineProperty(this, "markers", []);

    _defineProperty(this, "map", null);

    _defineProperty(this, "bounds", new google.maps.LatLngBounds());

    _defineProperty(this, "handleResults", function (event) {
      var results = event.detail;
      console.log('showing results from map', results);

      for (var m in results) {
        var business = results[m];
        var businessMarker = {
          lat: business.coordinates.latitude,
          lng: business.coordinates.longitude
        }; // console.log(this.map);

        var marker = new google.maps.Marker({
          position: businessMarker,
          map: _this.map,
          title: business.name
        });
        var loc = new google.maps.LatLng(marker.position.lat(), marker.position.lng());
        var contentString = business.name + '<br/>' + business.rating + ' ⭐' + '<br/>' + business.price + '<br/>' + business.display_phone + '<br/>' + business.location.display_address; // console.log(contentString);

        var infowindow = new google.maps.InfoWindow({
          content: contentString
        });
        console.log(infowindow);

        _this.markers.forEach(function (marker) {
          marker.addListener('click', function () {
            infowindow.open(_this.map, marker);
          });
        });

        _this.bounds.extend(loc);

        _this.markers.push(marker);

        _this.map.fitBounds(_this.bounds);

        _this.map.panToBounds(_this.bounds);
      }
    });

    _defineProperty(this, "clearMap", function () {
      _this.markers.forEach(function (marker) {
        marker.setMap(null);
      });

      _this.markers = [];
    });

    this.setupMap();
    var buttonEl = document.querySelector('[name="search"]');
    buttonEl.addEventListener('click', this.clearMap);
    var bodyEl = document.querySelector('body');
    bodyEl.addEventListener('got-results', this.handleResults);
  }

  _createClass(GoogleApi, [{
    key: "setupMap",
    value: function setupMap() {
      var circusLatLng = {
        lat: 33.813242,
        lng: -84.361712
      };
      this.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: circusLatLng
      }); // this.markers.push(marker);
    }
  }]);

  return GoogleApi;
}();

function initMap() {
  new GoogleApi(document.getElementById('#map'));
}
//# sourceMappingURL=google-map.js.map

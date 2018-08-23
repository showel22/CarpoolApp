$(document).ready(function () {
    var location;
    var geocode;
    $('select').formSelect();

    $('select[name="locationDropdown"]').change(function () {
        location = $(this).val();
        console.log(location);

        L.mapquest.key = 'R2POye2cSeMlUA3OSTAUv7Tr5qN3UvAL';

        addDirections();

        function addDirections() {
            var directions = L.mapquest.directions();
            directions.route({
                start: location,
                end: "84 5th St NW, Atlanta, GA 30308",
                options: {
                    enhancedNarrative: true,
                }
            }, createMap, getWeather)
        }

        function createMap(err, response) {
            var map = L.mapquest.map('map', {
                center: [33.792590, -84.289520],
                layers: L.mapquest.tileLayer('map'),
                zoom: 13
            });

            var directionsLayer = L.mapquest.directionsLayer({
                directionsResponse: response
            }).addTo(map);

            var narrativeControl = L.mapquest.narrativeControl({
                directionsResponse: response,
                compactResults: true,
                interative: true
            });
            narrativeControl.setDirectionsLayer(directionsLayer);
            narrativeControl.addTo(map);
        }

        function getWeather(){
            $.ajax({
                url: 'api.openweathermap.org/data/2.5/weather?zip=30308' + '&units=metric' + '&APPID=1ede66527ee8ef75941667ec8b7d7893',
                type: "GET",
                success: function(data) {
                    $("#showWeather").html(data);
                }
            })
        }
    });
})



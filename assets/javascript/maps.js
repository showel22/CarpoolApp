$(document).ready(function () {
    var location;
    $('select').formSelect();
    /*
        $('select[name="locationDropdown"]').change(function () {
            location = $(this).val();
            console.log(location);
    */
    $(document).on('click', '.tripRow', function (e) {
        var id = $(event.target).siblings('td')[3].textContent;
        L.mapquest.key = 'R2POye2cSeMlUA3OSTAUv7Tr5qN3UvAL';

        addDirections(id);

        function addDirections(id) {
            var directions = L.mapquest.directions();
            directions.route({
                start: id,
                end: "84 5th St NW, Atlanta, GA 30308",
                options: {
                    enhancedNarrative: true,
                }
            }, createMap)
        }


        // Get Weather data from OpenWeather API
        function getWeather() {
            console.log("Iam Running!")
            $.ajax({
                url: 'https://api.openweathermap.org/data/2.5/weather?zip=30308' + '&units=metric' + '&APPID=1ede66527ee8ef75941667ec8b7d7893',
                type: "GET",
                dataType: "jsonp",
                success: function (data) {
                    console.log(data);
                    /*
                     var table = '';
                     var tableHeader = '<h2 style=font-size:15px; margin-top: 20px>Weather Forecast</h2>';
                     table += "<tr>";
                     table += "<td>" + data.weather[0].description + "</td>";
                     table += "<td><img src='http://openweathermap.org/img/w/"+data.weather[0].icon+".png'></td></td>";
                     table += "<td>" + data.main + "</td>";
                     table += "</tr>";
                     $('#weather').html(table);
                     */

                    var weather = showWeather(data);
                    $('#weather').html(weather);
                }
            })
        }

        function showWeather(data) {
            return '<h4>Current Conditions:</h4>' +
                "<img src='https://openweathermap.org/img/w/" + data.weather[0].icon + ".png'>"
                + data.weather[0].main +
                "<h6>Humidity: " + data.main.humidity + "%</h6>" +
                "<h6>Sunrise: " + toTimeString(data.sys.sunrise) + "</h6>" +
                "<h6>Sunset: " + toTimeString(data.sys.sunset) + "</h6>";

        }

        function toTimeString(seconds) {
            return (new Date(seconds * 1000)).toUTCString().match(/(\d\d:\d\d:\d\d)/)[0];
        }

        function createMap(err, response) {
            console.log("But I have ran")

            var container = L.DomUtil.get('map');
            if (container != null) {
                container._leaflet_id = null;
            }

            var mapDiv = 'map';
            $('body').append($('<div>', { id: mapDiv }));
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
            getWeather();
        }
    });
})




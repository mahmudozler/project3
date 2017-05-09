function initAutocomplete() {

    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 51.927466, lng: 4.468419},
        zoom: 13,
        streetViewControl: false,
        clickableIcons: false,
        mapTypeControl: false,
        mapTypeId: 'roadmap'
    });

    //draw dangerzones
    wijkenLocs.forEach(function (wijk)
    {
      if(wijk.percentage > 19){
        var color = '#FF0000';
      } else if(wijk.percentage > 15 && wijk.percentage < 19){
        var color = '#ff9811';
      } else {
        var color = '#2fa318';
      }
      new google.maps.Circle({
        strokeOpacity: 0.8,
        strokeWeight: 0,
        fillColor: color,
        fillOpacity: 0.25,
        map: map,
        center: {lat: wijk.lat, lng: wijk.long},
        radius: wijk.radius
      });
    });

    ////////// deze stuk is nieuw!!!
    function loadP(latitude,longitude, name,capacity){
        var contentString = '<div id="content" style="width: 500px">' + name + ', deze parkeergarage heeft een capaciteit van : ' + capacity + ' plekken.'
        var infowindow = new google.maps.InfoWindow({
            content: contentString });
        var uluru = {lat:latitude, lng:longitude};
        var image = 'https://cdn3.iconfinder.com/data/icons/mapicons/icons/parking.png'
        var marker = new google.maps.Marker({
            position: uluru,
            map: map,
            icon:image});
        marker.addListener('click', function () {
        infowindow.open(map, marker);
        });
    }

    loadP(51.91024645,4.482313155,'Erasmusbrug ','100')
    loadP(51.92102728,4.473618335,'Schouwburgplein ','250')
    loadP(51.91353858,4.471392875,'Erasmus MC ','225')
    loadP(51.92235545,4.410238266,'Museumpark ','200')
    loadP(51.9229085,4.474601678, 'Schiedam Centrum ','180')
    loadP(51.92277892,4.472594261,'Weena ', '200')
    loadP(51.9231296,4.476483464, 'Plaza Casino ','120')
    loadP(51.91626759,4.47776556, 'Kruiskade ','140')
    loadP(51.91851424,4.476982355,'Westblaak ','120')
    loadP(51.9106444,4.470202513, 'Lijnbaan ','300')
    loadP(51.92052918,4.478473663,'Bijenkorf ','300')
    loadP(51.9196094,4.481585026,'Beursplein ','200')

    /////////////// tot hier

    getDistricts();
    // De zoekfunctie
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    map.addListener('bounds_changed', function () {
        searchBox.setBounds(map.getBounds());
    });

    var markers = [];

    searchBox.addListener('places_changed', function () {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }

        markers.forEach(function (marker) {
            marker.setMap(null);
        });
        markers = [];

        //mu coe

        var bounds = new google.maps.LatLngBounds();


        places.forEach(function (place) {
            if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
            }

            var contentString = getData(place.name);

            var infowindow = new google.maps.InfoWindow({
                content: contentString
            });

            var icon = {
                url: "img/carbreak.png",
                scaledSize: new google.maps.Size(50, 50), // scaled size
                origin: new google.maps.Point(0,0), // origin
                anchor: new google.maps.Point(0,0) // anchor
            };

            var marker = new google.maps.Marker({
                map: map,
                title: place.name,
                position: place.geometry.location
            });

            marker.addListener('click', function () {
                infowindow.open(map, marker);
            });

            markers.push(marker);

            if (place.geometry.viewport) {

                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }

            console.log(place);
        });
        map.fitBounds(bounds);
    });
}

function loadDoc(place) {
    var json = null;

    var url = "http://localhost/project3/api/" + place;
    $.ajax({
        async: false,
        url: url,
        success: function (result) {
            json = result
        }
    });

    return json;
}

function setInput(placename) {
    var el = document.getElementById('pac-input');
    el.value = placename;

    google.maps.event.trigger(el, 'focus');
    google.maps.event.trigger(el, 'keydown', {
        keyCode: 13
    });
}

function getDistricts() {
    var json = loadDoc('beschadiging_auto');
    json.results.forEach(function(element) {
        $("#available_places").append('<button type="button" class="list-group-item setinput">'+element.name+'</button>');
    });

    $('.setinput').click(function() {
        var text = $(this).text();
        setInput(text)
    });
}

function getData(name) {
    var contentString = null;

    var placename = name.split(' ').join('_').toLowerCase();
    var json = loadDoc(placename);

    contentString = '<div id="content" style="width: 500px">' +
            '<p>Beschadiging auto</p>'+
            '<div class="progress">' +
                '<div class="progress-bar progress-bar-2006 progress-bar-striped active"  style="width: '+json.results[0].beschadiging_auto['2006']+'%">' +
                json.results[0].beschadiging_auto['2006']+ '%' +
                '</div>' +
                '<div class="progress-bar progress-bar-2007 progress-bar-striped active"  style="width: '+json.results[0].beschadiging_auto['2007']+'%">' +
                json.results[0].beschadiging_auto['2007']+ '%' +
                '</div>' +
                '<div class="progress-bar progress-bar-2008 progress-bar-striped active"  style="width: '+json.results[0].beschadiging_auto['2008']+'%">' +
                json.results[0].beschadiging_auto['2008']+ '%' +
                '</div>' +
                '<div class="progress-bar progress-bar-2009 progress-bar-striped active"  style="width: '+json.results[0].beschadiging_auto['2009']+'%">' +
                json.results[0].beschadiging_auto['2009']+ '%' +
                '</div>' +
                '<div class="progress-bar progress-bar-2011 progress-bar-striped active"  style="width: '+json.results[0].beschadiging_auto['2011']+'%">' +
                json.results[0].beschadiging_auto['2011']+ '%' +
                '</div>' +
            '</div>'+
            '<p>Diefstal uit auto</p>'+
            '<div class="progress">' +
                '<div class="progress-bar progress-bar-2006 progress-bar-striped active"  style="width: '+json.results[0].diefstal_uit_auto['2006']+'%">' +
                json.results[0].diefstal_uit_auto['2006']+ '%' +
                '</div>' +
                '<div class="progress-bar progress-bar-2007 progress-bar-striped active"  style="width: '+json.results[0].diefstal_uit_auto['2007']+'%">' +
                json.results[0].diefstal_uit_auto['2007']+ '%' +
                '</div>' +
                '<div class="progress-bar progress-bar-2008 progress-bar-striped active"  style="width: '+json.results[0].diefstal_uit_auto['2008']+'%">' +
                json.results[0].diefstal_uit_auto['2008']+ '%' +
                '</div>' +
                '<div class="progress-bar progress-bar-2009 progress-bar-striped active"  style="width: '+json.results[0].diefstal_uit_auto['2009']+'%">' +
                json.results[0].diefstal_uit_auto['2009']+ '%' +
                '</div>' +
                '<div class="progress-bar progress-bar-2011 progress-bar-striped active"  style="width: '+json.results[0].diefstal_uit_auto['2011']+'%">' +
                json.results[0].diefstal_uit_auto['2011']+ '%' +
                '</div>' +
            '</div>'+
            '<p>Slachtoffers diefstal auto</p>'+
            '<div class="progress">' +
                '<div class="progress-bar progress-bar-2006 progress-bar-striped active"  style="width: '+json.results[0].slachtoffers_diefstal_auto['2006']+'%">' +
                json.results[0].slachtoffers_diefstal_auto['2006']+ '%' +
                '</div>' +
                '<div class="progress-bar progress-bar-2007 progress-bar-striped active"  style="width: '+json.results[0].slachtoffers_diefstal_auto['2007']+'%">' +
                json.results[0].slachtoffers_diefstal_auto['2007']+ '%' +
                '</div>' +
                '<div class="progress-bar progress-bar-2008 progress-bar-striped active"  style="width: '+json.results[0].slachtoffers_diefstal_auto['2008']+'%">' +
                json.results[0].slachtoffers_diefstal_auto['2008']+ '%' +
                '</div>' +
                '<div class="progress-bar progress-bar-2009 progress-bar-striped active"  style="width: '+json.results[0].slachtoffers_diefstal_auto['2009']+'%">' +
                json.results[0].slachtoffers_diefstal_auto['2009']+ '%' +
                '</div>' +
                '<div class="progress-bar progress-bar-2011 progress-bar-striped active"  style="width: '+json.results[0].slachtoffers_diefstal_auto['2011']+'%">' +
                json.results[0].slachtoffers_diefstal_auto['2011']+ '%' +
                '</div>' +
            '</div>'+
        '</div>';


    return contentString;
}

var wijkenLocs = [
  {wijk:"Delfshaven",lat:51.90667000, long:4.45133000, radius:300, percentage:16.4},
  {wijk:"Bospolder",lat:51.90881000, long:4.44124000, radius:250, percentage:16.3},
  {wijk:"Tussenijken",lat:51.913247, long:4.442074, radius:250, percentage:21.4},
  {wijk:"Spangen",lat:51.917435, long:4.436091, radius:400, percentage:14.5},
  {wijk:"Nieuwe Westen",lat:51.914989, long:4.451090, radius:300, percentage:15.3},
  {wijk:"Middelland",lat:51.914717, long:4.459333, radius:250, percentage:20.5},
  {wijk:"Oud/Nieuw Mathenesse/Witte Dorp",lat:51.914422, long:4.426318, radius:200, percentage:19.8},
  {wijk:"Schiemond",lat:51.901691, long:4.453669, radius:300, percentage:12.2},
];

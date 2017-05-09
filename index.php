<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Project3</title>
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">
</head>
<body>

<div id="map">

</div>
<input id="pac-input" class="controls" type="text" placeholder="Zoeken...">


<div id="over_map">
    <div id="mappanel" class="panel panel-default">
        <div class="panel-body">

            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">Legenda</h3>
                </div>
                <div class="panel-body">

                    <div class="progress">
                        <div class="progress-bar progress-bar-2006 progress-bar-striped active" role="progressbar"
                             aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%">
                            2006
                        </div>
                    </div>
                    <div class="progress">
                        <div class="progress-bar progress-bar-2007 progress-bar-striped active" role="progressbar"
                             aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%">
                            2007
                        </div>
                    </div>
                    <div class="progress">
                        <div class="progress-bar progress-bar-2008 progress-bar-striped active" role="progressbar"
                             aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%">
                            2008
                        </div>
                    </div>
                    <div class="progress">
                        <div class="progress-bar progress-bar-2009 progress-bar-striped active" role="progressbar"
                             aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%">
                            2009
                        </div>
                    </div>

                    <div class="progress">
                        <div class="progress-bar progress-bar-2011 progress-bar-striped active" role="progressbar"
                             aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%">
                            2011
                        </div>
                    </div>
                </div>
            </div>

            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">Beschikbare Wijken</h3>
                </div>
                <div class="panel-body">
                    <div id="available_places" class="list-group">

                    </div>
                </div>
            </div>

        </div>
    </div>
</div>

<footer>
    <script src="js/jquery.min.js"></script>
    <script src="js/bootstrap.min.js"></script>

    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAM7WElMvvvkLc1tx7e584jHirJTykGkeU&libraries=places&callback=initAutocomplete"
            async defer></script>

<!--    AIzaSyAitsk5Z2HQWJO6YdM9C36Krb1BCjBWSw4
        AIzaSyDnIwtpWaP-G_4ervWVrB027WP0f_Gm56o
        AIzaSyAM7WElMvvvkLc1tx7e584jHirJTykGkeU
-->

    <script src="js/map.js"></script>
</footer>
</body>
</html>

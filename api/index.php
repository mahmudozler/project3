<?php

include "db.php";
include "functions.php";

$statement = null;
$section = $_GET['section'];
$data = null;

switch ($section) {
    case 'beschadiging_auto' :
        $data = getData($conn, 'beschadiging_auto');

        break;
    case 'diefstal_uit_auto' :
        $data = getData($conn, 'diefstal_uit_auto');
        break;
    case 'slachtoffers_diefstal_auto' :
        $data = getData($conn, 'slachtoffers_diefstal_auto');
        break;
    case 'delfshaven':
       $data = getDataDistrict($conn, 'Delfshaven');
        break;
    case 'bospolder':
        $data = getDataDistrict($conn, 'Bospolder');
        break;
    case 'spangen';
        $data = getDataDistrict($conn, 'Spangen');
        break;
    case 'nieuwe_westen':
        $data = getDataDistrict($conn, 'Nieuwe Westen');
        break;
    case 'middelland':
        $data = getDataDistrict($conn, 'Middelland');
        break;
    case 'oud-mathenesse':
        $data = getDataDistrict($conn, 'Oud Mathenesse');
        break;
    case 'nieuw-mathenesse':
        $data = getDataDistrict($conn, 'Nieuw Mathenesse');
        break;
    case 'witte_dorp':
        $data = getDataDistrict($conn, 'Witte Dorp');
        break;
    case 'schiemond':
        $data = getDataDistrict($conn, 'Schiemond');
        break;

}

header('Content-Type: application/json');
print json_encode($data);


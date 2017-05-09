<?php

function getData($conn ,$tablename){
    $data = array(
        'results' => array()
    );

    $district = array('name' => null,
        'data' => array(
            2006 => null,
            2007 => null,
            2008 => null,
            2009 => null,
            2011 => null,
        ));

    $statement = $conn->prepare("SELECT * FROM $tablename ");
    $statement->execute(array());

    while ($row = $statement->fetch()) {
        $district['name'] = $row['Wijk'];
        foreach ($district['data'] as $key => $value) {
            $district['data'][$key] = floatval($row[$key]);
        }
        array_push($data['results'], $district);
    }

    return $data;
}

function getDataDistrict($conn, $districtname){

    $data = array(
        'results' => array()
    );

    $districtdata = array(
        'name' => $districtname,
        'beschadiging_auto' => array(
            2006 => null,
            2007 => null,
            2008 => null,
            2009 => null,
            2011 => null,
        ),
        'diefstal_uit_auto' => array(
            2006 => null,
            2007 => null,
            2008 => null,
            2009 => null,
            2011 => null,
        ),
        'slachtoffers_diefstal_auto' => array(
            2006 => null,
            2007 => null,
            2008 => null,
            2009 => null,
            2011 => null,
        )
    );

    $statement = $conn->prepare("SELECT * , 'beschadiging_auto' as table_name FROM beschadiging_auto WHERE Wijk = :wijk UNION ALL
        SELECT * , 'diefstal_uit_auto' as table_name FROM diefstal_uit_auto WHERE Wijk = :wijk UNION ALL
        SELECT * , 'slachtoffers_diefstal_auto' as table_name FROM slachtoffers_diefstal_auto WHERE Wijk = :wijk");
    $statement->execute(array(
        'wijk' => $districtname
    ));

    while ($row = $statement->fetch()) {
        switch ($row['table_name']){
            case 'beschadiging_auto':
                foreach ($districtdata['beschadiging_auto'] as $key => $value) {
                    $districtdata['beschadiging_auto'][$key] = floatval($row[$key]);
                }
                break;
            case 'diefstal_uit_auto':
                foreach ($districtdata['diefstal_uit_auto'] as $key => $value) {
                    $districtdata['diefstal_uit_auto'][$key] = floatval($row[$key]);
                }
                break;
            case 'slachtoffers_diefstal_auto':
                foreach ($districtdata['slachtoffers_diefstal_auto'] as $key => $value) {
                    $districtdata['slachtoffers_diefstal_auto'][$key] = floatval($row[$key]);
                }
                break;
        };
    }
    array_push($data['results'], $districtdata);

    return $data;
}
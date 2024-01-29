<?php

include("access.php");


function getLuogo($code): false|string
{
    global $conn;
    $query = "SELECT data, valore FROM rilevazioni WHERE codseqst = '$code' AND data LIKE '%01'";

    $data = array();
    $result = $conn->query($query);

    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    return json_encode($data);

}


function getGiarol($code, $pm): false|string
{
    global $conn;
    $query = "SELECT data, valore FROM rilevazioni WHERE codseqst = '$code' AND tipoInquinante = '$pm' AND data LIKE '%01'";

    $data = array();
    $result = $conn->query($query);

    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    return json_encode($data);

}


function getPeriodo($start, $end): false|string
{
    global $conn;
    $query = "SELECT codseqst, AVG(valore) AS media FROM rilevazioni WHERE data BETWEEN '$start' AND '$end' GROUP BY codseqst";

    $data = array();
    $result = $conn->query($query);

    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    return json_encode($data);

}


function getValore($val, $limit): false|string
{
    global $conn;
    $query = "SELECT R.codseqst, S.nome , R.data, R.tipoInquinante FROM rilevazioni AS R, stazioni AS S WHERE R.codseqst = S.codseqst AND R.valore = '$val' ORDER BY R.data DESC LIMIT $limit";

    $data = array();
    $result = $conn->query($query);

    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    return json_encode($data);

}

?>
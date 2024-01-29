<?php

include("methods.php");

$param = $_GET["get"];

switch ($param) {

    case "luogo":
        $luogo = $_GET["luogo"];
        if (isset($_GET["pm"])) {
            echo getGiarol($luogo, $_GET["pm"]);
        } else {
            echo getLuogo($luogo);
        }

        break;

    case "periodo":
        $start = $_GET["start"];
        $stop = $_GET["stop"];

        echo getPeriodo($start, $stop);
        break;

    case "valore":
        $valore = $_GET["valore"];
        $limite = $_GET["limite"];

        echo getValore($valore, $limite);
        break;

}

?>
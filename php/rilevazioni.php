<?php

include("access.php");

$stazioni = array(
    "500015821",
    "500000116",
    "500000120",
    "500000134",
    "500031115",
    "500031115"
);


function read($file_in): void
{
    global $conn;

    $csvFile = fopen($file_in, 'r');

    fgetcsv($csvFile);

    while (($line = fgetcsv($csvFile, 1000)) !== FALSE) {
        prepareArray($line, $conn);
    }

}


function prepareArray($line, $conn): void
{
    global $stazioni;

    for ($i = 1; $i < 7; $i++) {
        $data = date_create_from_format('d/m/Y', $line[0])->format('Y-m-d');
        $cod = $stazioni[$i - 1];
        $val = $line[$i];
        $tipo = ($i == 6) ? "PM25" : "PM10";

        $array = [$cod, $data, $tipo, $val];

        insertRilevazioni($array, $conn);

    }
}


function checkRilevazioni($codseqst, $date, $tipo, $conn): bool
{
    $query = "SELECT * FROM rilevazioni WHERE codseqst = '$codseqst' AND data = '$date' AND tipoInquinante = '$tipo'";
    $result = $conn->query($query);

    return $result->num_rows == 1;

}


function insertRilevazioni($array, $conn): void
{
    if (!checkRilevazioni($array[0], $array[1], $array[2], $conn)) {
        $query = "INSERT INTO rilevazioni VALUES (?, ?, ?, ?)";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("sssi", $array[0], $array[1], $array[2], $array[3]);

        $stmt->execute();
        $stmt->close();

    }
}

?>
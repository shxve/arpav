<?php


function prepare($file_in): void
{
    $csvFile = fopen($file_in, 'r');

    $titles = fgetcsv($csvFile);
    $indexPK = array_search("codseqst", $titles);
    $indexTipoZona = array_search("tipozona", $titles);

    while (($data = fgetcsv($csvFile, 1000)) !== FALSE) {
        $arr = [];

        array_push($arr, $data[$indexPK]);

        for ($i = 0; $i < count($data); $i++) {
            if ($i != $indexPK && $i != $indexTipoZona) {
                array_push($arr, $data[$i]);
            }
        }

        insertStazioni($arr);

    }
}


function checkStazioni($pk): bool
{
    include("access.php");

    $query = "SELECT * FROM stazioni WHERE codseqst = $pk";
    $result = $conn->query($query);

    return $result->num_rows == 1;

}


function insertStazioni($array): void
{
    include("access.php");

    if (!checkStazioni($array[0])) {
        $stmt = $conn->prepare("INSERT INTO stazioni VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("sssssdd", $array[0], $array[1], $array[2], $array[3], $array[4], $array[5], $array[6]);

        $stmt->execute();
        $stmt->close();
        $conn->close();

    }
}

?>
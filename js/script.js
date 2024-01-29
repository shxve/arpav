const STAZIONI = {
    "500015821": "Boscochiesanuova",
    "500000116": "Legnago",
    "500000134": "C.so Milano",
    "500000120": "San Bonifacio",
    "500031115": "Giarol Grande"
};

const CHIAVI = ["codseqst", "nome", "data", "tipoInquinante"];

let luogoChart;
let periodoChart;


async function getJsonData(url) {
    return (
        await fetch(url, {
            method: "GET",
        })
    ).json();
}


async function getLuogo(code) {
    if (luogoChart) luogoChart.destroy();
    let canvas = $("#luogoChart");
    let ctx = $(canvas).get(0).getContext("2d");
    let data;
    let options;

    if (code === "500031115") {
        let firstData = await getJsonData(`php/controller.php?get=luogo&luogo=${code}&pm=PM10`);
        let secondData = await getJsonData(`php/controller.php?get=luogo&luogo=${code}&pm=PM25`);

        data = {
            labels: firstData.map(row => row.data),
            datasets: [
                {
                    label: "PM10",
                    data: firstData.map(row => row.valore)
                },
                {
                    label: "PM2,5",
                    data: secondData.map(row => row.valore)
                }
            ]
        }

        options = {
            interaction: {
                intersect: false,
                mode: 'index',
            },
            plugins: {
                tooltip: {
                    padding: 10,
                    titleAlign: "center",
                    bodyAlign: "center",
                    footerAlign: "center",
                    callbacks: {
                        label: labelGiarol,
                        afterBody: function (context) {
                            return " ";
                        },
                        footer: adviceGiarol,
                    },
                    font: {
                        size: 16,
                    }
                }
            }
        };

    } else {
        let dataRetrived = await getJsonData(`php/controller.php?get=luogo&luogo=${code}`);

        data = {
            labels: dataRetrived.map(row => row.data),
            datasets: [
                {
                    data: dataRetrived.map(row => row.valore)
                }
            ]
        };

        options = {
            plugins: {
                legend: false,
                tooltip: {
                    padding: 10,
                    position: "nearest",
                    titleAlign: "center",
                    bodyAlign: "center",
                    footerAlign: "center",
                    displayColors: false,
                    callbacks: {
                        afterBody: function (context) {
                            return " ";
                        },
                        beforeFooter: value,
                        footer: function (context) {
                            return " ";
                        },
                        afterFooter: advice,
                    },
                    font: {
                        size: 16,
                    }
                }
            }
        };
    }

    luogoChart = createChart(ctx, "line", data, options);

}


async function getPeriodo(start, end) {
    let dataRetrived = await getJsonData(`php/controller.php?get=periodo&start=${start}&stop=${end}`);
    let canvas = $("#periodoChart");
    let ctx = $(canvas).get(0).getContext("2d");
    let data;
    let options;

    if (periodoChart) periodoChart.destroy();

    data = {
        labels: dataRetrived.map(row => STAZIONI[row.codseqst]),
        datasets: [
            {
                data: dataRetrived.map(row => row.media)
            }
        ]
    };

    options = {
        responsive: true,
        plugins: {
            legend: false,
            tooltip: {
                padding: 10,
                position: "nearest",
                titleAlign: "center",
                bodyAlign: "center",
                footerAlign: "center",
                displayColors: false,
                callbacks: {
                    afterBody: function (context) {
                        return " ";
                    },
                    beforeFooter: value,
                    footer: function (context) {
                        return " ";
                    },
                    afterFooter: advice,
                },
            }
        }
    };

    periodoChart = createChart(ctx, "bar", data, options);

}


async function getValore(valore, limite) {
    let dataRetrived = await getJsonData(`php/controller.php?get=valore&valore=${valore}&limite=${limite}`);

    if (dataRetrived.length === 0) {
        zeroResults();
        return;
    }

    $(".noresult").css("display", "none");
    deleteTable();
    createTable();
    createAnalisysTable();
    createAnalisys(valore);

    let row;
    let cell;
    let key;

    for (let i = 0; i < dataRetrived.length; i++) {
        row = $("<tr>");

        for (let j = 0; j < 4; j++) {
            cell = $("<td>");
            key = CHIAVI[j];

            $(cell).text(dataRetrived[i][key]);
            $(row).append(cell);

        }

        $("#tbody").append(row);

    }
}


function deleteTable() {
    $(".table").remove();
}


function createTable() {
    let tableTag = $("<table>");

    $(tableTag).attr("class", "table table-striped table-dark table-hover");
    $(tableTag).css("width", "900px");

    let content = "<thead><tr><th scope='col'>Codice</th><th scope='col'>Nome</th><th scope='col'>Data</th><th scope='col'>Tipo</th></tr></thead><tbody id='tbody'></tbody>";

    $(tableTag).html(content);
    $("#tableColumn").append(tableTag);

}

function createAnalisysTable() {
    let tableTag = $("<table>");

    $(tableTag).attr("class", "table table-striped table-dark table-hover");
    $(tableTag).css("max-width", "700px");

    let tbody = "<tr><td>PM 10</td><td>μg/m³</td><td>50</td></tr><tr><td>PM 2,5</td><td>μg/m³</td><td>25</td></tr>";

    let content = `<thead><tr><th scope='col'>Inquinante</th><th scope='col'>Unità di Misura</th><th scope='col'>Limite</th></tr></thead><tbody id='tbody'>${tbody}</tbody>`;

    $(tableTag).html(content);
    $("#analisiColumn").append(tableTag);

}

function createAnalisys(valore) {
    let pTag = $("<p>");
    let text;



}


function zeroResults() {
    deleteTable();
    $(".noresult").css("display", "block");
}


function getValoriLuogo(sel) {
    getLuogo(sel.value);
}


function getValoriPeriodo() {
    let start = $("#start").val();
    let end = $("#end").val();

    getPeriodo(formatDate(start), formatDate(end));

}


function getValoreValore() {
    let valore = $("#valore").val();
    let limite = $("#limite").val();

    getValore(valore, limite);

}


function formatDate(date) {
    let values = date.split("-");
    return `${values[0]}-${values[2]}-${values[1]}`;
}


$("#valore").on("keypress", function (e) {
    let code = e.keyCode || e.which;

    if (code == "13") {
        $("#submit").click();
    }

});

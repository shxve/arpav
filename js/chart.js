function createChart(canvas, type, data, options) {
    return new Chart(canvas, {
        type: type,
        data: data,
        options: options
    });
}
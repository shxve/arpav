const ADVICES = {
    "Rischio per la salute": "Luogo pericoloso per la salute, si consiglia di intervenire\n per abbassare il livello di polveri sottili!",
    "Elevato": "Luogo ad alta presenza di polveri sottili, con una esposizione prolungata\n si potrebbero riscontrare problemi di salute!",
    "Moderato": "Polveri sottili nella media, si consiglia\n comunque una esposizione controllata!",
    "Ottimale": "Livello di polveri sottili molto basso,\n questo luogo è sicuro per la salute!"
}

const value = (context) => {
    let valore = context[0].parsed.y;

    return checkValore(valore);

}

const advice = (context) => {
    let string = checkValore(context[0].parsed.y);

    return ADVICES[string];
}

const adviceGiarol = (context) => {
    let first = checkValore(context[0].parsed.y);
    let second = checkValore(context[1].parsed.y, true);

    return `${ADVICES[first]}\n \n${ADVICES[second]}`;

}

const labelGiarol = (context) => {
    let valore = context.parsed.y;
    let string = (context.dataset.label === "PM10") ? checkValore(valore) : checkValore(valore, true);

    return valore + " " + string;

}

function checkValore(valore, giarol = false) {
    if (!giarol) {
        if (valore >= 80) return "Rischio per la salute";
        if (valore >= 50 && valore < 80) return "Elevato";
        if (valore < 50 && valore > 25) return "Moderato";
    } else {
        if (valore >= 50) return "Rischio per la salute";
        if (valore >= 25 && valore < 50) return "Elevato";
        if (valore < 25 && valore > 12) return "Moderato";
    }

    return "Ottimale";

}

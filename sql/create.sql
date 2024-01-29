CREATE TABLE stazioni (
    codseqst CHAR(9) PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    località VARCHAR(255) NOT NULL,
    comune VARCHAR(255) NOT NULL,
    provincia VARCHAR(255) NOT NULL,
    lat DOUBLE NOT NULL,
    lon DOUBLE NOT NULL
);

CREATE TABLE rilevazioni (
    codseqst CHAR(9) NOT NULL,
    data DATE NOT NULL,
    tipoInquinante CHAR(4) NOT NULL,
    valore INT NOT NULL,
    PRIMARY KEY (codseqst, data, tipoInquinante),
    FOREIGN KEY (codseqst) REFERENCES stazioni(codseqst) ON UPDATE CASCADE ON DELETE CASCADE
);

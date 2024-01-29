# Polveri Sottili

![Build Status](https://img.shields.io/badge/Status-Developed-green?style=flat)
![Author](https://img.shields.io/badge/author-Foroni%20Pietro-light?style=flat)
![Language](https://img.shields.io/badge/language-PHP-orange?style=flat)
![Language](https://img.shields.io/badge/language-HTML-orange?style=flat)
![Language](https://img.shields.io/badge/language-CSS-orange?style=flat)
![Language](https://img.shields.io/badge/language-JavaScript-orange?style=flat)
![Platform](https://img.shields.io/badge/OS%20platform%20supported-All-blue?style=flat)
![Testing](https://img.shields.io/badge/version-v1.0-green)

---

## Progetto

The project aims to raise awareness among users about the issue of fine particulate matter and air pollution, which unfortunately affects us on a daily basis. I have developed a comprehensive web app that, thanks to **Arpav** [(discover Arpav)](https://www.arpa.veneto.it/) provides access to a database containing **hundreds of real daily measurements** from 2019 and 2020, collected from **5 different stations scattered throughout the Veneto region**.

---

## Operation

You will need to install an Apache web server with MySQL as the DBMS and have a functioning PHP installation. If you meet all the requirements, simply execute the SQL code found in /sql/create.sql to create the necessary tables. Afterward, open the web app, which will automatically populate the database tables with the data located in /data.

---

## Directory

deploy sprint:

    ARPAV.zip

with the current directories structure:

```

├── index.html
├── luogo.html
├── periodo.html
├── valore.html
├── README.md
└── php
    └── access.php
    └── insert.php
    └── rilevazioni.php
    └── stazioni.php
    └── controller.php
    └── methods.php
└── js
    └── charts.js
    └── script.js
    └── tooltips.js
└── img
    └── back.jpg
    └── favicon.ico
    └── icon.png
└── sql
    └── create.sql
└── data
    └── coords.json
    └── coords.csv
    └── PM10_centraline_daily_2019.csv
    └── PM10_centraline_daily_2020.csv
    └── stats.csv
    └── stats.json
└── css
    └── style.css

```

---

## Required

MySQL (<https://www.mysql.com/it/downloads/>)

Apache web server

PHP (<https://www.php.net/downloads>)

---

## Tags

#markdown, #arpav, #workgroup, #polverisottili, #php, #css, #javascript, #html, #csv, #json, #mysql, #apache, #jquery

---

## Author

Made by Foroni Pietro

## Contact

If you have any problem please contact me:

> pietro.foroni.2004@gmail.com

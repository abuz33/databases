let mysql = require('mysql');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'new_world'
});

let querries = {
    countriesPopulationGreaterThan8M: "SELECT name, population FROM country WHERE population > 8000000;",
    namesOfCountriesHaveLandInside: "SELECT name FROM country WHERE name LIKE '%land%';",
    namesOfCitiesPopulationBetween500k1M: "SELECT name, population FROM city WHERE population BETWEEN 500000 AND 1000000;",
    countriesInEurope: "SELECT name FROM country WHERE continent = 'Europe';",
    countriesDescOrderedBySurfaceArea: "SELECT name, SurfaceArea FROM country ORDER BY SurfaceArea DESC;",
    citiesInNetherlands: "SELECT name, countryCode from city where countryCode LIKE 'NLD';",
    populationOfRoterdam: "SELECT name, population FROM city WHERE name = 'Rotterdam';",
    top10LargestCountry: "SELECT name, SurfaceArea FROM country ORDER BY SurfaceArea DESC LIMIT 10;",
    top10PopulatedCountry: "SELECT name, population FROM city ORDER BY population DESC LIMIT 10;",
    populationOfWorld: "SELECT SUM(population)  AS 'Population of the World' FROM country;"
};

for (let querry in querries) {
    connection.query(querries[querry], function (error, results, fields) {
        if (error) throw error;
        console.log(`${querry}`, results);
    }
)};

connection.end();
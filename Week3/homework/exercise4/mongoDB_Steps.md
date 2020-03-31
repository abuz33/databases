1- Be sure you have the data in the database (Or you store them in a database)

2- Convert the data to JSON (Using Workbench) or CSV file.
    In workbench, after choosing the schema, right click to tables which wanted to be exported. And chosing file format and location. You're done.

    Using this lines in mysql terminal convert it to csv files.
    
    select * into outfile 'city.csv' FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' from city;

    select * into outfile 'country.csv' FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' from country;

    select * into outfile 'countrylanguage.csv' FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' from countrylanguage;

3- We can import the files using the commands down belove.

    mongoimport --db World --collection city --file city.json
    mongoimport --db World --collection country --file country.json
    mongoimport --db World --collection countryLangue --file countryLangue.json

Or for CSV

    mongoimport --db World --collection city --file city.csv
    mongoimport --db World --collection country --file country.csv
    mongoimport --db World --collection countryLangue --file countryLangue.csv
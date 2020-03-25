const util = require('util');
const mysql = require('mysql');

const CONNECTION_CONFIG = {
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'researchers'
};

const queries = {
    "All research papers and the number of authors that wrote that paper": `SELECT COUNT(DISTINCT(paper_id)) AS "Numbers Of Total Papers"
                                                                                FROM research_papers AS r
                                                                                LEFT JOIN authors AS a
                                                                                ON r.author_no = a.author_no;`,
    "Sum of the research papers published by all female authors.": `SELECT COUNT(*) AS "Total Number of Research By Female Researchers"
                                                                        FROM research_papers AS R
                                                                        LEFT JOIN authors AS A
                                                                        ON R.author_no = A.author_no
                                                                        WHERE A.gender = "F";`,
    "Average of the h-index of all authors per university." :`SELECT AVG(h_index), university FROM authors GROUP BY university;`,
    "Sum of the research papers of the authors per university.": `SELECT A.university, COUNT(r.paper_id) AS "Number of Papers per UNI"
                                                                    FROM research_papers AS r 
                                                                    RIGHT JOIN authors as A
                                                                    ON r.author_no = A.author_no
                                                                    GROUP BY university;`,
    "Minimum and maximum of the h-index of all authors per university.": `SELECT MIN(h_index), MAX(h_index), university 
                                                                            FROM authors
                                                                            GROUP BY university;`
}


async function seedDatabase() {
  const connection = mysql.createConnection(CONNECTION_CONFIG);

  const execQuery = util.promisify(connection.query.bind(connection));

    

  connection.connect();

  try {
    await Promise.all(
            Object.keys(queries)
                .map(async key => {
                    console.log(`${key} `, await execQuery(queries[key]));
                }));

    connection.end();

  } catch (error) {
    console.error(error);
    connection.end();
  }
}

seedDatabase();

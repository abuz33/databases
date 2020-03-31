const util = require('util');
const mysql = require('mysql');

const CONNECTION_CONFIG = {
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'researchers'
};



async function seedDatabase() {
  const connection = mysql.createConnection(CONNECTION_CONFIG);

  const execQuery = util.promisify(connection.query.bind(connection));

  const SHOW_FRIENDS = `SELECT A.author_name AS "Author Name", B.author_name AS "Friend" FROM authors AS B LEFT JOIN authors AS A ON B.author_no = A.friend;`;

  const SHOW_PAPERS = `SELECT A.*, P.paper_title AS title 
    FROM authors AS A 
    LEFT JOIN relations_authors_researches AS R
    ON  A.author_no = R.author_no 
    LEFT JOIN research_papers AS P
    ON  R.paper_id = P.paper_id;`;

  connection.connect();

  try {
    console.log(await execQuery(SHOW_FRIENDS));
    console.log(await execQuery(SHOW_PAPERS));
    
    connection.end();
  } catch (error) {
    console.error(error);
    connection.end();
  }
}

seedDatabase();

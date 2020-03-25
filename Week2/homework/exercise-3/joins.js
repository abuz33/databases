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

  const SHOW_FRIENDS = `SELECT A.author_name, B.author_name FROM authors AS A LEFT JOIN authors AS B ON A.author_no = B.friend;`;

  const SHOW_PAPERS = `SELECT A.author_name, P.paper_title AS title FROM authors AS A left JOIN research_papers AS P
  ON  A.author_no = P.author_no;`;

  connection.connect();

  try {
    await execQuery(SHOW_FRIENDS);
    await execQuery(SHOW_PAPERS);
    
    connection.end();
  } catch (error) {
    console.error(error);
    connection.end();
  }
}

seedDatabase();

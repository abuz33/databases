const util = require('util');
const mysql = require('mysql');
const fs = require('fs');

const CONNECTION_CONFIG = {
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'researchers'
};



async function seedDatabase() {
  const connection = mysql.createConnection(CONNECTION_CONFIG);
  const readFile = util.promisify(fs.readFile);

  const execQuery = util.promisify(connection.query.bind(connection));

  const CREATE_Research_Papers_TABLE = `
        CREATE TABLE IF NOT EXISTS research_papers (
            paper_id INT PRIMARY KEY,
            paper_title VARCHAR(255),
            conference VARCHAR(255),
            publish_date date,
            author_no  INT,
            FOREIGN KEY (author_no) REFERENCES authors(author_no) 
        );`;


  connection.connect();

  try {
    await execQuery(CREATE_Research_Papers_TABLE);

    const dataAuth = await readFile(__dirname + '/authors.json', 'utf8');
    const authors = JSON.parse(dataAuth);

    const promises = authors.map(author => execQuery('INSERT INTO authors SET ?', author));
    await Promise.all(promises);

    const dataPapers = await readFile(__dirname + '/papers.json', 'utf8');
    const papers = JSON.parse(dataPapers);

    const promisesPapers = papers.map(author => execQuery('INSERT INTO research_papers SET ?', author));
    await Promise.all(promisesPapers);

    connection.end();

  } catch (error) {
    console.error(error);
    connection.end();
  }
}

seedDatabase();

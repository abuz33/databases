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
      publish_date date
    );`;

  const CREATE_Relations_TABLE = `
    CREATE TABLE IF NOT EXISTS relations_authors_researches (
      author_no INT,
      paper_id INT,
      CONSTRAINT FK_Author FOREIGN KEY(author_no) REFERENCES authors(author_no),
      CONSTRAINT FK_Paper FOREIGN KEY(paper_id) REFERENCES research_papers(paper_id),
      CONSTRAINT PK_Author_Paper PRIMARY KEY(author_no, paper_id) 
  );`;

  connection.connect();

  try {
    await execQuery(CREATE_Research_Papers_TABLE);
    await execQuery(CREATE_Relations_TABLE);

    const dataAuth = await readFile(__dirname + '/authors.json', 'utf8');
    const authors = JSON.parse(dataAuth);

    const promises = authors.map(author => execQuery('INSERT INTO authors SET ?', author));
    await Promise.all(promises);

    const dataPapers = await readFile(__dirname + '/papers.json', 'utf8');
    const papers = JSON.parse(dataPapers);

    const promisesPapers = papers.map(author => execQuery('INSERT INTO research_papers SET ?', author));
    await Promise.all(promisesPapers);

    const dataRelations = await readFile(__dirname +'/relations.json', 'UTF8');
    const relations = JSON.parse(dataRelations);

    const promisesRelations = relations.map(relation => execQuery('INSERT INTO relations_authors_researches SET ?', relation));
    await Promise.all(promisesRelations);

    const dataFriends = await readFile(__dirname + '/friends.json' , 'UTF8');
    const friends = JSON.parse(dataFriends);

    const promisesFriends = friends.map(friend => execQuery(`UPDATE authors SET friend = ${friend.friend} WHERE author_no = ${friend.author_no}`));
    await Promise.all(promisesFriends);

    connection.end();

  } catch (error) {
    console.error(error);
    connection.end();
  }
}

seedDatabase();

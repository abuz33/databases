const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword'
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
  const CREATE_DATABASE_RESEARCHERS = `CREATE DATABASE IF NOT EXISTS researchers;`;
  const USE_DATABASE = `USE researchers;`;
  const CREATE_AUTHORS_TABLE = `
    CREATE TABLE IF NOT EXISTS authors (
        author_no INT PRIMARY KEY,
        author_name VARCHAR(255),
        university VARCHAR(255),
        date_of_birth date,
        h_index INT,
        gender ENUM('M', 'F'),
        friend INT
    );`;
    
    const ADD_FOREIGN_KEY = `
        ALTER TABLE authors
        ADD CONSTRAINT fk_fri FOREIGN KEY(friend) references authors(author_no);
    `;

  connection.connect();

  try {
    await execQuery(CREATE_DATABASE_RESEARCHERS);
    await execQuery(USE_DATABASE);
    await execQuery(CREATE_AUTHORS_TABLE);
    await execQuery(ADD_FOREIGN_KEY);

    connection.end();

  } catch (error) {
    console.error(error);

    connection.end();
  }

}

seedDatabase();

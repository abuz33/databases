const mysql = require('mysql');
const util = require('util');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword'
});


async function createDBandTables() {
    const connect = util.promisify(connection.connect.bind(connection));
    const execQuery = util.promisify(connection.query.bind(connection));
    
    const CREATE_HDB_DATABASE = `CREATE DATABASE IF NOT EXISTS HDB`;
    const USE_HDB = `USE HDB`;

    const CREATE_Account_TABLE = `CREATE TABLE IF NOT EXISTS Account 
        (account_no INT PRIMARY KEY,
        balance DEC(10, 2))`;

    const CREATE_Account_Changes_TABLE = `CREATE TABLE IF NOT EXISTS Account_Changes 
        (change_no INT AUTO_INCREMENT PRIMARY KEY, 
        from_account_no INT, 
        to_account_no INT, 
        amount DEC(10, 2), 
        changed_date DATETIME, 
        remark VARCHAR(255),
        CONSTRAINT FK_from_acc_no FOREIGN KEY (to_account_no) REFERENCES Account(account_no),
        CONSTRAINT FK_to_acc_no FOREIGN KEY (from_account_no) REFERENCES Account(account_no))`;

    
    try {
        await connect;
        await Promise.all[(
            execQuery(CREATE_HDB_DATABASE),
            execQuery(USE_HDB),
            execQuery(CREATE_Account_TABLE),
            execQuery(CREATE_Account_Changes_TABLE)
        )]; 

        connection.end();
    } catch (err){
        console.error(err);
        connection.end();
    }
    
}

createDBandTables();
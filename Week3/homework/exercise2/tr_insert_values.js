const mysql = require('mysql');
const util = require('util');
const fs = require('fs');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database:"HDB"
});




async function insertValues() {
    const connect = util.promisify(connection.connect.bind(connection));
    const execQuery = util.promisify(connection.query.bind(connection));
    
    const readFile = util.promisify(fs.readFile);

    try {
        await connect;
        const dataAccounts = await readFile(__dirname + '/Accounts.json', 'UTF8'); 
        const accs = JSON.parse(dataAccounts);

        const promisesAccs = accs.map(acc => execQuery('INSERT INTO Account SET ?', acc));
        await Promise.all(promisesAccs);

        const dataAccountsChange = await readFile(__dirname + '/Account_Changes.json', 'UTF8'); 
        const accsChange = JSON.parse(dataAccountsChange);

        const promisesAccChngs = accsChange.map(accChng => execQuery('INSERT INTO Account_Changes SET ?', accChng));
        await Promise.all(promisesAccChngs);

        connection.end();
    } catch (err) {
        console.error(err);
        connection.end();
    }
}

insertValues();
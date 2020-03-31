const mysql = require('mysql');
const util = require('util');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database:"HDB"
});




async function transaction(accountFrom, accountTo, amount, remark) {
    const connect = util.promisify(connection.connect.bind(connection));
    const execQuery = util.promisify(connection.query.bind(connection));

    try {
        await connect;
        await execQuery('SET autocommit = 0');
        await execQuery('START TRANSACTION');
        const balanceAccountFrom = await execQuery(`SELECT balance FROM Account WHERE account_no = ${accountFrom}`);
        const balanceAccountTo = await execQuery(`SELECT balance FROM Account WHERE account_no = ${accountTo}`);

        const d = new Date();
        const date = d. getDate();
        const month = d. getMonth() + 1; 
        const year = d. getFullYear();
        const dateStr = year + "-" + month + "-" + date;
        
        if (balanceAccountFrom[0].balance < amount) {
            await execQuery(`INSERT INTO Account_Changes SET ?`, {
                from_account_no: accountFrom,
                to_account_no: accountTo,
                amount: amount,
                changed_date: dateStr,
                remark: "Declined due to insufficient amount in the sender Account"
            });
        } else {
            await execQuery(`UPDATE Account SET balance = balance - ${amount} WHERE account_no = ${accountFrom}`);
            await execQuery(`UPDATE Account SET balance = balance + ${amount} WHERE account_no = ${accountTo}`);
            await execQuery(`INSERT INTO Account_Changes SET ?`, {
                from_account_no: accountFrom,
                to_account_no: accountTo,
                amount: amount,
                changed_date: dateStr,
                remark: remark
            });
        };

        await execQuery('COMMIT;');
        connection.end();
    } catch (error) {
        console.log(error);
        await execQuery(`rollback();`)
        connection.end();
    }
}

transaction(104, 105, 100, "Paying Rent");
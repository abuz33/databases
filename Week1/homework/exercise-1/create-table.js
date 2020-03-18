let mysql = require('mysql');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'meetup'
});

connection.connect();

let invitee = "CREATE TABLE invitee (`invitee_no` INT, `invitee_name` VARCHAR(255), `invited_by` VARCHAR(255))";

let room = "CREATE TABLE room (`room_no` INT, `room_name` VARCHAR(255), `floor_number` INT)";

let meeting = "CREATE TABLE meeting (`meeting_no` INT, `meeting_title` VARCHAR(255), `starting_time` datetime, `ending_time` datetime)";

let querryArray = [invitee, room, meeting];

querryArray.forEach(query => {
    connection.query(query, function (error, results, fields) {
        if (error) {
            throw error;
        }
        console.log(`querry is done.`);
    });
})

connection.end();

let mysql = require('mysql');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'meetup'
});

connection.connect();

let invitees = [
    {
        invitee_no:1,
        invitee_name:"John DOE",
        invited_by:"Jake Doe"
    },
    {
        invitee_no:2,
        invitee_name:"Jane Judy",
        invited_by:"Jake Doe"
    },
    {
        invitee_no:3,
        invitee_name:"Sana Sana",
        invited_by:"Jake Doe"
    },
    {
        invitee_no:4,
        invitee_name:"Doctor Who",
        invited_by:"Jake Doe"
    },
    {
        invitee_no:5,
        invitee_name:"Jane Mentalist",
        invited_by:"Jake Doe"
    },
];

let rooms = [
    {
        room_no: 1,
        room_name: "Dublin",
        floor_number: 4
    },
    {
        room_no: 2,
        room_name: "Dubai",
        floor_number: 4
    },
    {
        room_no: 3,
        room_name: "Amsterdam",
        floor_number: 4
    },
    {
        room_no: 4,
        room_name: "Manchester",
        floor_number: 4
    },
    {
        room_no: 5,
        room_name: "Eindhoven",
        floor_number: 4
    },
];

let meetings = [
    {
        meeting_no: 1,
        meeting_title: "Web Development",
        starting_time: "2020-03-18 9:00:00",
        ending_time: "2020-03-18 10:00:00"
    },
    {
        meeting_no: 2,
        meeting_title: "Web Development",
        starting_time: "2020-03-18 10:00:00",
        ending_time: "2020-03-18 11:00:00"
    },
    {
        meeting_no: 3,
        meeting_title: "Web Development",
        starting_time: "2020-03-18 11:00:00",
        ending_time: "2020-03-18 12:00:00"
    },
    {
        meeting_no: 4,
        meeting_title: "Web Development",
        starting_time: "2020-03-18 13:00:00",
        ending_time: "2020-03-18 14:00:00"
    },
    {
        meeting_no: 5,
        meeting_title: "Web Development",
        starting_time: "2020-03-18 14:00:00",
        ending_time: "2020-03-18 16:00:00"
    }
];

// invitees.forEach(invitee => {
//     console.log(`INSERT INTO invitee VALUES(${parseInt(invitee.invitee_no)}, "${invitee.invitee_name}", "${invitee.invited_by}")`)
// })


invitees.forEach(query => {
    connection.query(`INSERT INTO invitee VALUES(${parseInt(query.invitee_no)}, "${query.invitee_name}", "${query.invited_by}")`, function (error, results, fields) {
        if (error) throw error;
        console.log(`querry is done.`);
    });
});

rooms.forEach(query => {
    connection.query(`INSERT INTO room VALUES(${parseInt(query.room_no)}, "${query.room_name}", ${query.floor_number})`, function (error, results, fields) {
        if (error) throw error;
        console.log(`querry is done.`);
    });
});

meetings.forEach(query => {
    connection.query(`INSERT INTO meeting VALUES(${parseInt(query.meeting_no)}, "${query.meeting_title}", "${query.starting_time}", "${query.ending_time}")`, function (error, results, fields) {
        if (error) throw error;
        console.log(`querry is done.`);
    });
});

connection.end();
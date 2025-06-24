



const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'kitsw'
});



db.connect(err => {
    if (err) throw err;
    console.log('Connected to database');
});

app.get('/questions', (req, res) => {
    const numberOfQuestions = 5; // How many you want per quiz

    db.query(SELECT * FROM questions ORDER BY RAND() LIMIT ?, [numberOfQuestions], (err, results) => {
        if (err) {
            console.error("Error fetching quiz questions:", err);
            res.status(500).json({ error: 'Database error' });
        } else {
            res.json(results);
        }
    });
});


app.listen(4000, () => {
    console.log('Server running on port 4000');
});
;



const express = require('express');
const mysql = require('mysql');

const app = express();

// MySQL connection configuration
const connection = mysql.createConnection({
  host: '34.93.92.142',
  user: 'root',
  password: 'prabisha@2023',
  database: 'prabisha'
});

// Connect to the MySQL database
connection.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

// Define an API endpoint to retrieve employee data
app.get('/employees', (req, res) => {
  const query = 'SELECT * FROM empdata';

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error retrieving employee data');
      return;
    }

    res.json(results);
  });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

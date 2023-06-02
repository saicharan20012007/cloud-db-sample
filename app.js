const express = require('express');
const mysql = require('mysql');

const app = express();

// MySQL connection configuration
// const connection = mysql.createConnection({
//   host: '34.93.92.142',
//   user: 'root',
//   password: 'prabisha@2023',
//   database: 'prabisha'
// });

// Connect to the MySQL database
connection.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

// Middleware to parse the request body as JSON
app.use(express.json());

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

// Define an API endpoint to add an employee
app.post('/addemp', (req, res) => {
  const employee = req.body;

  // Validate the required fields
  if (!employee || !employee.Id || !employee.Date || !employee.CurrentStatus || !employee.Name || !employee.Role || !employee.Work || !employee.company || !employee.Industry || !employee.Location || !employee.EmailId || !employee.Phone || !employee.Website || !employee.Responibilities || !employee.NextStep || !employee.Remarks || !employee.Revenue) {
    res.status(400).send('Invalid employee data');
    return;
  }

  // Insert the employee data into the database
  const query = 'INSERT INTO empdata (Id, Date, CurrentStatus, Name, Role, Work, company, Industry, Location, EmailId, Phone, Website, Responibilities, Reference, NextStep, Remarks, Revenue) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [
    employee.Id,
    employee.Date,
    employee.CurrentStatus,
    employee.Name,
    employee.Role,
    employee.Work,
    employee.company,
    employee.Industry,
    employee.Location,
    employee.EmailId,
    employee.Phone,
    employee.Website,
    employee.Responibilities,
    employee.Reference,
    employee.NextStep,
    employee.Remarks,
    employee.Revenue
  ];

  connection.query(query, values, (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error adding employee');
      return;
    }

    res.status(201).send('Employee added successfully');
  });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

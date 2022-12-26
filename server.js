const inquirer = require('inquirer');
 const mysql = require('mysql2');
 const cTable = require('console.table');
 require ('dotenv').config();

 const connection = mysql.createConnection({
     host: 'localhost',
     port: 3306,
     user: 'root',
     password: '99668733',
     database:  'employeeDB',
 });

 connection.connect((err) => {
     if (err) throw err;
     console.log(`You are connected as ${connection.threadId} \n`);
     startApp();
 });
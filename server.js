const inquirer = require('inquirer');
 const mysql = require('mysql2');
 const cTable = require('console.table');
 require('dotenv').config();

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
     connectionMessage();

 });


connectionMessage = () => {
    console.log("*************************************")
    console.log("**** EMPLOYEE MANAGEMENT PROGRAM ****")
    console.log("*************************************")
    startApp();
};



startApp = () => {
    inquirer.prompt([
        {
            name: 'initialInquiry',
            type: 'rawlist',
            message: 'Welcome to the Employee Management Program. What would you like to do?',
            choices: ['View Departments', 
            'View Roles',
            'View Employees', 
            'View Employees by Manager', 
            'Add a Department', 
            'Add a Role', 
            'Add an Employee', 
            'Update Employee role', 
            'Update Employee manager', 
            'Remove Department', 
            'Remove Role', 
            'Remove Employee', 
            'View Salary by Department', 
            'Exit']
        }
    ]).then((response) => {
        switch (response.initialInquiry) {
            case 'View Departments':
                viewDepartments();    
                break;
            case 'View Roles':
                viewRoles();
                break;
            case 'View Employees':
                viewEmployees();
                break;
            case 'View Employees by Manager':
                viewEmployeesByManager();
            break;
            case 'Add a Department':
                addDepartment();
            break;
            case 'Add a Role':
                addRole();
            break;
            case 'Add an Employee':
                addEmployee();
            break;
            case 'Update employee role':
                updateEmployeeRole();
            break;
            case 'Update Employee Manager':
                updateEmployeesManager();
            break;
            case 'Remove Department':
                removeDepartment();
            break;
            case 'Remove Role':
                removeRole();
            break;
            case 'Remove Employee':
                removeEmployee();
            break;
            case 'View Salary by Department':
                viewDepartmentSalary();
            break;
            case 'Exit':
                connection.end();
                console.log('\n Thank you for using your Employee Tracker application.  HAVE A GREAT DAY! \n');
                return;
            default:
                break;
        }
    })
}

viewDepartments = () => {
    connection.query(`SELECT * FROM department ORDER BY department_id ASC;`, (err, res) => {
        if (err) throw err;
        console.table('\n', res, '\n');
        startApp();
    })
};

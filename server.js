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
            message: 'Welcome to the employee management program. What would you like to do?',
            choices: ['View departments', 
            'View roles',
            'View employees', 
            'View employees by manager', 
            'Add a department', 
            'Add a role', 
            'Add an employee', 
            'Update employee role', 
            'Update employee manager', 
            'Remove department', 
            'Remove role', 
            'Remove employee', 
            'View salary by department', 
            'Exit']
        }
    ]).then((response) => {
        switch (response.initialInquiry) {
            case 'View departments':
                viewDepartments();    
                break;
            case 'View roles':
                viewRoles();
                break;
            case 'View employees':
                viewEmployees();
                break;
            case 'View employees by manager':
                viewEmployeesByManager();
            break;
            case 'Add a department':
                addDepartment();
            break;
            case 'Add a role':
                addRole();
            break;
            case 'Add an employee':
                addEmployee();
            break;
            case 'Update employee role':
                updateEmployeeRole();
            break;
            case 'Update employee manager':
                updateEmployeesManager();
            break;
            case 'Remove department':
                removeDepartment();
            break;
            case 'Remove role':
                removeRole();
            break;
            case 'Remove employee':
                removeEmployee();
            break;
            case 'View salary by department':
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

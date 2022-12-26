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
viewRoles = () => {
    connection.query(`SELECT role.role_id, role.title, role.salary, department.department_name, department.department_id FROM role JOIN department ON role.department_id = department.department_id ORDER BY role.role_id ASC;`, (err, res) => {
        if (err) throw err;
        console.table('\n', res, '\n');
        startApp();
    })
};

viewEmployees = () => {
    connection.query(`SELECT e.employee_id, e.first_name, e.last_name, role.title, department.department_name, role.salary, CONCAT(m.first_name, ' ', m.last_name) manager FROM employee m RIGHT JOIN employee e ON e.manager_id = m.employee_id JOIN role ON e.role_id = role.role_id JOIN department ON department.department_id = role.department_id ORDER BY e.employee_id ASC;`, (err, res) => {
        if (err) throw err;
        console.table('\n', res, '\n');
        startApp();
    })
};

viewEmployeesByManager = () => {
    connection.query(`SELECT employee_id, first_name, last_name FROM employee ORDER BY employee_id ASC;`, (err, res) => {
        if (err) throw err;
        let managers = res.map(employee => ({name: employee.first_name + ' ' + employee.last_name, value: employee.employee_id }));
        inquirer.prompt([
            {
            name: 'manager',
            type: 'rawlist',
            message: 'Which manager would you like to see the employee\'s of?',
            choices: managers   
            },
        ]).then((response) => {
            connection.query(`SELECT e.employee_id, e.first_name, e.last_name, role.title, department.department_name, role.salary, CONCAT(m.first_name, ' ', m.last_name) manager FROM employee m RIGHT JOIN employee e ON e.manager_id = m.employee_id JOIN role ON e.role_id = role.role_id JOIN department ON department.department_id = role.department_id WHERE e.manager_id = ${response.manager} ORDER BY e.employee_id ASC`, 
            (err, res) => {
                if (err) throw err;
                console.table('\n', res, '\n');
                startApp();
            })
        })
    })
}
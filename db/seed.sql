INSERT INTO department (department_name)
VALUES ('SALES'),
('HUMAN RESOURCES'),
('DEVELOPER'),
('IT/HELPDESK'),
('EXECUTIVE STAFF');

INSERT INTO role (title, salary, department_id)
VALUES ('Account Executive', 80000, 1),
('Sr. Account Executive', 100000, 1),
('Sales Director', 1800000, 1),
('HR Staff', 75000, 2),
('HR Director', 100000, 2),
('Jr Developer', 90000, 3),
('Sr Developer', 150000, 3),
('Development Director', 190000, 3),
('Helpdesk Tecnician', 70000, 4),
('Helpdesk Manager', 100000, 4),
('Helpdesk Director', 180000,4),
('Chief Financial Officer', 280000, 5),
('Chief Operational Officer', 280000, 5), 
('Chief Executive Officer', 300000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Low', 'Saetern', 12, NULL),
('Jedrik', 'Timbol', 13, 1),
('Amy', 'Alejandro', 14, 1),
('Belle', 'Chao', 3, 2),
('Jerome', 'Fernandez', 9, 2),
('Devin', 'Quoc', 11, 2),
('Winnie', 'Lai', 6, 2),
('Jack', 'Nguyen', 1, 4),
('Eldrich', 'Briones', 1, 4);

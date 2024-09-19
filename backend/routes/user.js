const express = require('express');
const router = express.Router();

const { registerUser, userLogin, addTask, getEmployee, getTask, delTask, updateTask, updateUser, delUser,registerEmployee, getAssignedTasks ,updateTaskStatus} = require('../controller/userController');
const { authenticate, authorize } = require('../middleware/authorization');

// Register New User (Public Route)
router.post('/register', registerUser);

//admin create employee
router.post('/register-employee', authenticate, authorize('Admin'), registerEmployee);

// User Login (Public Route)
router.post('/login', userLogin);

// Fetch All Users (admin only)
router.get('/employees', authenticate, authorize('Admin', 'Manager'), getEmployee);

// Add Task (admin or manager)
router.post('/addtask', authenticate, authorize('Admin', 'Manager'), addTask);

// Get All Tasks (admin or manager)
router.get('/tasks', authenticate, authorize('Admin', 'Manager'), getTask);

// Delete Task (admin or manager for their tasks)
router.delete('/deletetask/:id', authenticate, authorize('Admin', 'Manager'), delTask);

// Update Task (admin or manager for their tasks)
router.put('/updatetask/:id', authenticate, authorize('Admin', 'Manager'), updateTask);

// Update User (admin only)
router.put('/updateuser/:id', authenticate, authorize('Admin'), updateUser);

// Delete User (admin only)
router.delete('/deleteuser/:id', authenticate, authorize('Admin'), delUser);


//view assigned task 
router.get('/assigned-tasks', authenticate,authorize('Employee'), getAssignedTasks);

//Update the assigned task 
router.put('/update-task-status/:id', authenticate, authorize('Employee'), updateTaskStatus);


module.exports = router;

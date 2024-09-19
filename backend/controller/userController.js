const router = require("express").Router()
const { User, validateRegister, validateLogin, validateTask, Task, validateEmployee } = require('../models/user')
const bcrypt = require('bcrypt')
const Joi = require('joi')
const mongoose = require('mongoose')

//register user
const registerUser = async (req, res) => {
    try {
        const { error } = validateRegister(req.body)
        if (error)
            return res.status(400).send({ message: error.details[0].message })

        const user = await User.findOne({ email: req.body.email })
        if (user)
            return res.status(409).send({ message: "User already exist" })
        const salt = await bcrypt.genSalt(Number(process.env.SALT))
        const hashPassword = await bcrypt.hash(req.body.password, salt)

        const savedUser = await new User({ ...req.body, password: hashPassword }).save()
        res.status(201).send({
            message: "User created succesfully", user: savedUser
        })

    } catch (error) {
        res.status(500).send({ message: 'Internal server error' })

    }
}

//register employee
const registerEmployee = async (req, res) => {
    try {
        const { error } = validateEmployee(req.body)
        if (error)
            return res.status(400).send({ message: error.details[0].message })

        const user = await User.findOne({ email: req.body.email })
        if (user)
            return res.status(409).send({ message: "User already exist" })
        const salt = await bcrypt.genSalt(Number(process.env.SALT))
        const hashPassword = await bcrypt.hash(req.body.password, salt)

        const savedUser = await new User({ ...req.body, password: hashPassword }).save()
        res.status(201).send({
            message: "User created succesfully", user: savedUser
        })

    } catch (error) {
        res.status(500).send({ message: 'Internal server error' })

    }
}

//user login
const userLogin = async (req, res) => {
    try {
        const { error } = validateLogin(req.body)
        if (error)
            return res.status(400).send({ message: error.details[0].message })

        const user = await User.findOne({ email: req.body.email })

        if (!user)
            return res.status(401).send({ message: 'invalid Email or Password' })


        const validPassword = await bcrypt.compare(
            req.body.password, user.password
        )
        if (!validPassword)
            return res.status(401).send({ message: "invalid Email or Password " })

        const token = user.generateAuthToken()
        res.status(200).send({ data: token, message: "Logged in successfully" })
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" })
    }


}

//Add Task
const addTask = async (req, res) => {
    try {

        // Validate the request body
        const { error } = validateTask(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message });

        let assignedUser = null;

        if (req.body.AssignedToEmployeeID) {
            assignedUser = await User.findById(req.body.AssignedToEmployeeID);
            if (!assignedUser) {
                return res.status(404).send({ message: "Assigned user not found" });
            }
        }

        const task = new Task({
            TaskName: req.body.TaskName,
            description: req.body.description || "",
            AssignedToEmployeeID: assignedUser ? assignedUser._id : null,
            AssignedToEmployeeName: req.body.AssignedToEmployeeName || ""
        });

        await task.save();
        res.status(201).send({ message: "Task created successfully", task });
    } catch (error) {
        console.error('Error creating task:', error.message);
        res.status(500).send({ message: "Internal Server Error" });
    }
};



//get all employee
const getEmployee = async (req, res) => {
    try {
        const employees = await User.find();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: "Error fetching employees", error: error.message });
    }
};


//get all Task
const getTask = async (req, res) => {
    try {
        const task = await Task.find();
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: "Error fetching task", error: error.message });
    }
};

// delete task
const delTask = async (req, res) => {
    try {
        const taskId = req.params.id; 

        
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        await Task.findByIdAndDelete(taskId);

        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ message: "Server error. Could not delete task." });
    }
};

//update task
const updateTask = async (req, res) => {
    try {
        const taskId = req.params.id;

        console.log(`Received taskId: ${taskId}`); // Debugging statement

        // Validate the ObjectId
        if (!mongoose.Types.ObjectId.isValid(taskId)) {
            return res.status(400).json({ error: 'Invalid Task ID' });
        }

        const { TaskName, description, AssignedToEmployeeID, AssignedToEmployeeName } = req.body;

        // Find the task by ID and update it
        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            { TaskName, description, AssignedToEmployeeID, AssignedToEmployeeName },
            { new: true }
        );

        console.log(`Updated Task: ${JSON.stringify(updatedTask)}`); // Debugging statement

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        return res.status(200).json({
            message: "Task updated successfully",
            data: updatedTask
        });
    } catch (error) {
        console.error("Error updating task:", error);
        return res.status(500).json({ message: "Error updating task", error });
    }
};




//update user
const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;

        console.log(`Received userId: ${userId}`);

        // Validate the ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: 'Invalid User ID' });
        }

        const { firstName, lastName, email, password, role } = req.body;

        // Find the user by ID and update it
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { firstName, lastName, email, password, role },
            { new: true } 
        );

        console.log(`Updated User: ${JSON.stringify(updatedUser)}`); 

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({
            message: "User updated successfully",
            data: updatedUser
        });
    } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({ message: "Error updating user", error });
    }
};



//delete user
const delUser = async (req, res) => {
    try {
        const userId = req.params.id; 

        // Check if the task exists
        const task = await User.findById(userId);
        if (!task) {
            return res.status(404).json({ message: "User not found" });
        }

        // Delete the task
        await User.findByIdAndDelete(userId);

        // Return success message
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ message: "Server error. Could not delete task." });
    }
};

//get current user for auth
const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id); 
        if (!user) return res.status(404).send({ message: 'User not found' });
        res.send({ role: user.role }); 
    } catch (error) {
        res.status(500).send({ message: 'Internal server error' });
    }
};


// Get assigned tasks for logged-in employee
const getAssignedTasks = async (req, res) => {
    try {
        const userId = req.user._id; 

        // Fetch tasks assigned to this user
        const tasks = await Task.find({ AssignedToEmployeeID: userId });

        // Check if there are no tasks assigned to the user
        if (!tasks || tasks.length === 0) {
            return res.status(404).send({ message: 'No tasks assigned to you yet.' });
        }

        res.status(200).send({ tasks });
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};


//update the task status 
const updateTaskStatus = async (req, res) => {
    try {
        const userId = req.user._id; 
        const { id: taskId } = req.params; 
        const { status } = req.body; 

        const task = await Task.findOne({ _id: taskId, AssignedToEmployeeID: userId });

        if (!task) {
            return res.status(404).send({ message: 'Task not found or unauthorized.' });
        }

        // Validate and update the status
        const validStatuses = ['Pending', 'Ongoing', 'Finished'];
        if (!validStatuses.includes(status)) {
            return res.status(400).send({ message: 'Invalid status.' });
        }

        task.status = status;
        await task.save();

        res.status(200).send({ message: 'Task status updated successfully.', task });
    } catch (error) {
        console.error('Error updating task status:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};


module.exports = {
    registerUser,
    userLogin,
    addTask,
    getEmployee,
    getTask,
    delTask,
    updateTask,
    updateUser,
    delUser,
    getCurrentUser,
    registerEmployee,
    getAssignedTasks,
    updateTaskStatus
}
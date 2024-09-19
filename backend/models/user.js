const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

// User Schema
const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { 
        type: String, 
        enum: ['Employee', 'Manager', 'Admin'], 
        default: 'Employee', // Default role is Employee
        required: true
    }
});

//  generate auth token for the user
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        { _id: this._id, role: this.role }, // Include role in the token
        process.env.JWTPRIVATEKEY, 
        { expiresIn: "7d" }
    );
    return token;
};

const User = mongoose.model("User", userSchema); 

// Task Schema
const taskSchema = new mongoose.Schema({
    TaskName: { type: String, required: true },
    description: { type: String, required: false },
    AssignedToEmployeeID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
    AssignedToEmployeeName: { type: String, required: false }, 
    status: { type: String, enum: ['Pending', 'Ongoing', 'Finished'], default: 'Pending' }, 
    createdAt: { type: Date, default: Date.now }
});


const Task = mongoose.model("Task", taskSchema); 

// Validation for registration
const validateRegister = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().required().label("First Name"),
        lastName: Joi.string().required().label("Last Name"),
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required().label("Password")
    });
    return schema.validate(data);
};

// Validation for login
const validateLogin = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required().label("Password")
    });
    return schema.validate(data);
};

// Validation for tasks
const validateTask = (data) => {
    const schema = Joi.object({
        TaskName: Joi.string().required().label("Task Name"),
        description: Joi.string().allow(null, '').optional().label("Description"),
        AssignedToEmployeeID: Joi.string().allow(null, '').optional().label("Assigned To ID"), // Allow null or empty string
        AssignedToEmployeeName: Joi.string().allow(null, '').optional().label("Assigned To Name") // Allow null or empty string
    });

    return schema.validate(data);
};




// Validation for registration employee
const validateEmployee = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().required().label("First Name"),
        lastName: Joi.string().required().label("Last Name"),
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required().label("Password"),
        role: Joi.string().required().label("Role")

    });
    return schema.validate(data);
};


module.exports = {
    User,
    Task,
    validateRegister,
    validateLogin,
    validateTask,
    validateEmployee
};

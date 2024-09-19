
const mongoose = require('mongoose');
const { User } = require('./models/user'); 
const bcrypt = require('bcrypt')


// Define default admin credentials
const adminCredentials = {
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@example.com',
    password: 'admin', 
    role: 'Admin'
};

const initializeAdmin = async () => {
    try {
        const existingAdmin = await User.findOne({ email: adminCredentials.email });
        if (existingAdmin) {
            console.log('Admin already exists');
            return;
        }

        const adminUser = new User({
            ...adminCredentials,
            password: await bcrypt.hash(adminCredentials.password, 10) 
        });
        await adminUser.save();
        console.log('Admin user created successfully');
    } catch (error) {
        console.error('Error creating admin user:', error);
    }
};

module.exports = initializeAdmin;

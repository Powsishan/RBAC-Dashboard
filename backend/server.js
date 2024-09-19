require('dotenv').config();
const express = require('express');
const connectDB = require('./db'); 
const userRoutes = require('./routes/user'); 
const cors = require("cors");
const initializeAdmin = require('./initializeAdmin');



const app = express();
const PORT = process.env.PORT || 4001;

// Connect to DB
connectDB();

app.use(express.json());
app.use(cors());
initializeAdmin();

app.use('/api/users', userRoutes);  

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

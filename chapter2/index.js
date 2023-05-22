const express = require('express');//global package, non-core module
const mongoose = require('mongoose'); 
const morgan = require('morgan'); 

const employeeRoutes = require('./routes/Employee');

mongoose.connect('mongodb://localhost:27017/mongotest').
	catch((error) => handleError(error));


const db = mongoose.connection; 

db.on('error', error => console.log(error)); //listeners for error during the connection
db.once('open' , ( ) => console.log('connection established to the database'));
//listener for once connecting to the database


const app = express(); 


//middlewares
app.use(morgan('dev')); 
app.use(express.json()); 
app.use(express.urlencoded({extended:true}));


//routes
app.use('/api/employee',employeeRoutes);




app.listen(3000, ()=> {
	console.log('app is listening on port 3000')
});


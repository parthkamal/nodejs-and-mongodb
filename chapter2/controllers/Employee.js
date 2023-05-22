const { default: mongoose } = require('mongoose');
const Employee = require('../models/Employee');



//list all the user
const index = (request, response, next) => {
    Employee.find()
        .then((data) => response.json({ data }))
        .catch((error) => response.json({ error }));
}


//show a user of certain _id
const show = (request, response, next) => {
    const { _id } = request.body;
    console.log('show')

    Employee.findById(_id)
        .then(user => response.json({ user }))
        .catch(error => response.json({ error }));
}


//add a new employee
const store = (request, response, next) => {

    const { name, designation, email, phone, age } = request.body;
    const newEmployee = new Employee(
        {
            _id: new mongoose.Types.ObjectId,
            name,
            designation,
            email,
            phone,
            age
        });

    newEmployee.save()
        .then(data => response.json({ data }))
        .catch(error => response.json({ error: error }));
}


//update an employee 
const update = (request, response, next) => {
    const { _id } = request.body;


    const { name, designation, email, phone, age } = request.body;

    const updatedData = {
        name,
        designation,
        email,
        phone,
        age
    }

    //$set we have seen in mongosh tutorial
    Employee.findByIdAndUpdate(_id, { $set: updatedData })
        .then(() => {
            const message = 'employee updated successfully';
            response.json({ message });
        }).catch(error => {
            response.json({ error });
        })

}

//delete an employee 

const destroy = (request, response, next) => {
    const { _id } = request.body;
    Employee.findByIdAndRemove(_id)
        .then(() => {
            const message = 'employee deleted successfully'
            response.json({ message });
        })
}

module.exports = { index, show, store, update, destroy };



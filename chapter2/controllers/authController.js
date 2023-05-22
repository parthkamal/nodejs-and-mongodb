const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { default: mongoose } = require('mongoose');


const register = (request, response, next) => {
    const { name, email, password, phone } = request.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = new User({
        _id: new mongoose.Types.ObjectId,
        name,
        email,
        password: hashedPassword,
        phone
    })

    newUser.save()
        .then((user) => response.json({ user }))
        .catch((error) => response.json({ error }));

}

const login = (request, response, next) => {
    const { username, password } = request.body;
    User.findOne({ $or: [{ email: username }, { phone: username }] })
        .then((user) => {
            const auth = bcrypt.compareSync(password, user.password);
            if (auth) {
                //assign the jwt token
                const token = jwt.sign({ name: user.name }, 'secretkey', { expiresIn: '1h' });
                const message = 'login successful';

                response.json({ message, token });
            } else {
                const message = "password not matched"
                response.json({ message });
            }
        })
}



module.exports = { register, login }



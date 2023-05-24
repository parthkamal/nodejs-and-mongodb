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
                const token = jwt.sign({ name: user.name }, 'thesecrettoken', { expiresIn: '1h' });
                const refreshtoken = jwt.sign({ name: user.name }, 'refreshtokensecret', { expiresIn: '48h' });

                const message = 'login successful';

                response.json({ message, token, refreshtoken});
            } else {
                const message = "password not matched"
                response.json({ message });
            }
        })
}

const refreshtoken = (request, response, next)=> {
    const refreshtoken = request.body.refreshtoken;
    jwt.verify(refreshtoken,'refreshtokensecret',(error,decode)=>{
        if(error)response.status(400).json({error});
    else {
        const token = jwt.sign({ name: decode.name }, 'thesecrettoken', { expiresIn: '1h' });
        const refreshtoken = request.body.refreshtoken;
        const message = 'token refreshed successfully';
        response.status(200).json({message,token,refreshtoken});

    }
    })
}



module.exports = { register, login, refreshtoken }



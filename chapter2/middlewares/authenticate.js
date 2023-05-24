const jwt = require('jsonwebtoken');


const authenticate = (request, response, next) => {
    try {
        const token = request.headers.authorization.split(' ')[1];
        const decode = jwt.verify(token,'secretkey');
        request.user = decode;

        next();

    }catch (error){

        const message = 'authentication failed';
        response.json({message});
    }
}


module.exports= authenticate;
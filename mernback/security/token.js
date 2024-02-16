const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    console.log(req.headers.authorization);

    if (!req.headers.authorization) {
        return res.status(401).send('no autorizado');
    }

    const token = req.headers.authorization.split(' ')[1];

    if (token === null) {
        return res.status(401).send('no autorizado');

    }

    const payload = jwt.verify(token , 'secretKey');
    console.log(payload);
    next();
}

module.exports = verifyToken;
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const authorization = req.headers['authorization'];

    if (!authorization) {
        res.status(403).json({ error: 'Não autorizado' });
        return;
    }

    const bearer = authorization.split(' ');
    const token = bearer[1];

    jwt.verify(token, process.env.SECRET, function (err, decoded) {
        if (err) {
            res.status(403).json({ error: 'Não autorizado' });
            return;
        }
        //deixando o id do usuário disponível para ser usado em outros métodos, após a validação do JWT.
        req.userId = decoded.id;
    });

    next();
}
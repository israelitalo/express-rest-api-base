const { checkSchema } = require('express-validator');

module.exports = {
    login: checkSchema({
        email: {
            notEmpty: true,
            isEmail: true,
            //normalizeEmail: true,
            errorMessage: 'E-mail inválido'
        },
        password: {
            notEmpty: true,
            errorMessage: 'Informe uma senha'
        }
    })
}
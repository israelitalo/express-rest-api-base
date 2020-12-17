const { checkSchema } = require('express-validator');

module.exports = {
    findById: checkSchema({
        id: {
            notEmpty: true,
            trim: true,
            isLength: {
                options: { min: 1 }
            },
            isNumeric: true,
            errorMessage: 'Usuário inválido'
        }
    }),
    addUser: checkSchema({
        name: {
            notEmpty: true,
            trim: true,
            isLength: {
                options: { min: 2 }
            },
            errorMessage: 'Nome com, pelo menos, 2 caractéres'
        },
        email: {
            notEmpty: true,
            isEmail: true,
            errorMessage: 'E-mail inválido'
        },
        password: {
            notEmpty: true,
            errorMessage: 'Informe uma senha'
        },
        role: {
            optional: true,
            isNumeric: true,
            errorMessage: 'Papél inválido'
        }
    }),
    updateUser: checkSchema({
        id: {
            notEmpty: true,
            trim: true,
            isLength: {
                options: { min: 1 }
            },
            isNumeric: true,
            errorMessage: 'Usuário inválido'
        },
        name: {
            optional: true,
            trim: true,
            isLength: {
                options: { min: 2 }
            },
            errorMessage: 'Nome com, pelo menos, 2 caractéres'
        },
        email: {
            optional: true,
            isEmail: true,
            errorMessage: 'E-mail inválido'
        },
        role: {
            optional: true,
            isNumeric: true,
            errorMessage: 'Papél inválido'
        }
    })
}
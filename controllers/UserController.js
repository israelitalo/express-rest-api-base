const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult, matchedData } = require('express-validator');

class UserController {

    async index(req, res) {
        const users = await User.findAll();
        res.status(200);
        res.json({ users });
    };

    async findById(req, res) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(406);
            res.json({ error: errors.mapped() });
            return;
        }

        const { id } = matchedData(req);

        const user = await User.findById(id);

        if (!user) {
            res.status(400);
            res.json({ error: 'Usuário inválido' });
        }

        res.status(200);
        res.json({ user });
    };

    async create(req, res) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(406);
            res.json({ error: errors.mapped() });
            return;
        }

        const { email, name, password, role } = matchedData(req);

        const verifyEmail = await User.findEmail(email);

        if (verifyEmail) {
            res.status(406);
            res.json({ error: 'E-mail já cadastrado' });
            return;
        }

        let newUser = {
            name,
            password,
            email,
            role: role ? role : 0
        };

        await User.create(newUser);

        res.status(200);
        res.json({ result: "Usuário criado com sucesso." });
    };

    async update(req, res) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(406);
            res.json({ error: errors.mapped() });
            return;
        }

        const { id, email, name, role } = matchedData(req);

        var result = await User.update(id, email, name, role);

        if (!result) {
            res.status(406);
            res.json({ error: 'Algo deu errado no servidor' });
            return;
        }

        if (result.error) {
            res.status(406);
            res.json({ error: result.error });
            return;
        }

        res.status(201);
        res.json({ user: result.user });
    }

    async delete(req, res) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(406);
            res.json({ error: errors.mapped() });
            return;
        }

        const { id } = matchedData(req);

        var result = await User.delete(id);

        if (result.error) {
            res.status(406);
            res.json({ error: result.error });
            return;
        }

        res.status(200);
        res.json({ success: 'Usuário excluído com sucesso' });
    }

    async login(req, res) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(406);
            res.json({ error: errors.mapped() });
            return;
        }

        const { email, password } = matchedData(req);

        var user = await User.findByEmail(email);

        if (!user) {
            res.status(406);
            res.json({ error: 'Email ou senha inválidos' });
            return;
        }

        let comparation = await bcrypt.compare(password, user.password);

        if (!comparation) {
            res.status(406);
            res.json({ error: 'Email ou senha inválidos' });
            return;
        }

        var token = jwt.sign({ id: user.id }, process.env.SECRET, {
            expiresIn: 24883200 // 24 horas 
        });

        res.status(200);
        res.json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                token
            }
        });
    }

}

module.exports = new UserController();
const knex = require('../database/connection');
const bcrypt = require('bcrypt');

class User {

    async findAll() {
        try {
            var result = await knex.select('id', 'name', 'email', 'role').table('users');
            return result;
        } catch (error) {
            console.log({ error });
            return [];
        }
    }

    async findById(id) {
        try {
            var result = await knex.select('id', 'name', 'email', 'role').table('users').where({ id });
            if (result.length > 0) {
                return result[0];
            } else {
                return undefined;
            }
        } catch (error) {
            return undefined;
        }
    }

    async create(user) {

        const { name, password, email, role } = user;

        try {
            var hash = await bcrypt.hash(password, 10);
            await knex.insert({
                name,
                password: hash,
                email,
                role
            }).table('users');
        } catch (error) {
            console.log({ error });
        }

    }

    async findEmail(email) {
        try {
            var result = await knex.select("*").from('users').where({ email });
            if (result.length > 0) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            return false;
        }
    }

    async update(id, email, name, role) {
        let user = await this.findById(id);

        if (user == undefined) {
            return { status: false, error: 'Usuário inexistente' }
        }
        let editUser = {};

        if (email != undefined) {
            if (email != user.email) {
                var verifyEmail = await this.findEmail(email);
                if (verifyEmail) {
                    return { status: false, error: 'E-mail já cadastrado' }
                }
                editUser.email = email;
            }
        }

        if (name != undefined) {
            editUser.name = name;
        }

        if (role != undefined) {
            editUser.role = role;
        }

        try {
            await knex.update(editUser).table('users').where({ id });
            return { status: true, user: editUser }
        } catch (error) {
            return { status: false, error }
        }

    }

    async delete(id) {
        let user = await this.findById(id);

        if (!user) {
            return { status: false, error: 'Usuário inexistente' }
        }

        try {
            await knex.delete().table('users').where({ id });
            return { status: true }
        } catch (error) {
            return { status: false, error }
        }
    }

    async findByEmail(email) {
        try {
            let result = await knex.select('*').table('users').where({ email });
            if(result.length > 0){
                return result[0];
            }else{
                return undefined
            }
        } catch (error) {
            return undefined;
        }
    }

}

module.exports = new User();
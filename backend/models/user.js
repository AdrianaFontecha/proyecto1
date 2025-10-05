const db = require('../config/config');
const bcrypt = require('bcryptjs');
const User = {};

User.findAll = (result) => {
    const sql = `SELECT id, email, name, lastname, phone, image, role, created_at, updated_at FROM users`;
    db.query(sql, (err, users) => {
        if (err) {
            console.log('Error al listar usuarios: ', err);
            result(err, null);
        } else {
            console.log('Usuarios encontrados: ', users.length);
            result(null, users);
        }
    });
};

User.findById = (id, result) => {
    const sql = `SELECT id, email, name, lastname, image, phone, role, password FROM users WHERE id = ?`;
    db.query(sql, [id], (err, user) => {
        if (err) {
            console.log('Error al consultar: ', err);
            result(err, null);
        }
        else {
            console.log('Usuario consultado: ',  user[0] );
            result(null, user[0]);
        }
    });
};

User.findByEmail = (email, result) => {
    const sql = `SELECT id, email, name, lastname, image, phone, role, password FROM users WHERE email = ?`;
    db.query(sql, [email], (err, user) => {
        if (err) {
            console.log('Error al consultar: ', err);
            result(err, null);
        }
        else {
            console.log('Usuario consultado: ',  user[0] );
            result(null, user[0]);
        }
    });
};

User.create = async (user, result) => {
    const hash = await bcrypt.hash(user.password, 10)  
    const validRoles = ['admin', 'seller', 'customer', 'user'];
    const role = validRoles.includes(user.role) ? user.role : 'user';
    const sql = `INSERT INTO users(
                    name, 
                    lastname,
                    email, 
                    password,
                    phone,
                    image,
                    role,
                    created_at,
                    updated_at
                ) VALUES (?,?,?,?,?,?,?,?,?)`;
    db.query(sql,
        [
            user.name,
            user.lastname,
            user.email,
            hash,
            user.phone,
            user.image,
            role,
            new Date(),
            new Date()
        ], (err, res) => {
            if (err) {
                console.log('Error al crear al Usuario: ', err);
                result(err, null);
            } else {
                console.log('Usuario creado: ', {id: res.insertId, ...user});
                result(null, {id: res.insertId, ...user});
            }
        }
    );
};

User.update = async (user, result) => {
    let fields = [];
    let values = [];

    if (user.password) {
        const hash = await bcrypt.hash(user.password, 10);
        fields.push("password = ?");
        values.push(hash);
    }

    if (user.email) {
        fields.push("email = ?");
        values.push(user.email);
    }
    if (user.name) {
        fields.push("name = ?");
        values.push(user.name);
    }
    if (user.lastname) {
        fields.push("lastname = ?");
        values.push(user.lastname);
    }
    if (user.phone) {
        fields.push("phone = ?");
        values.push(user.phone);
    }
    if (user.image) {
        fields.push("image = ?");
        values.push(user.image);
    }
    if (user.role) {
        fields.push("role = ?");
        values.push(user.role);
    }

    fields.push("updated_at = ?");
    values.push(new Date());

    const sql = `UPDATE users SET ${fields.join(", ")} WHERE id = ?`;
    values.push(user.id);

    db.query(sql, values, (err, res) => {
        if (err) {
            console.log('Error al actualizar usuario: ', err);
            result(err, null);
        } else {
            console.log('Usuario actualizado: ', { id: user.id, ...user });
            result(null, { id: user.id, ...user });
        }
    });
};

User.delete = (id, result) => {
    const sql = `DELETE FROM users WHERE id = ?`;
    db.query(sql, [id], (err, res) => {
        if (err) {
            console.log('Error al eliminar usuario: ', err);
            result(err, null);
        } else {
            console.log('Usuario eliminado con id: ', id);
            result(null, res);
        }
    });
};

module.exports = User;
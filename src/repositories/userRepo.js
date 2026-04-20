import primsa from '../config/db.js';

export async function createUser(data) {
    try {
        const newUser = await primsa.user.create({
            data,
            omit: { password: true }
        });
        return newUser;
    } catch (error) {
        if(error.code === 'P2002'){
            const err = new Error('Email is already in use.');
            err.status = 409;
            throw err;
        }
        throw error;
    }
}

export async function findUserByEmail(email) {
    const user = primsa.user.findUnique({
        where: {
            email: email
        }
    });
    return user;
}
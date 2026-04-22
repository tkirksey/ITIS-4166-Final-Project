import prisma from '../config/db.js';
import primsa from '../config/db.js';
import NotFoundError from '../errors/NotFoundError.js';

export async function create(data) {
    try {
        const newUser = await primsa.user.create({
            data,
            omit: { password: true }
        });
        return newUser;
    } catch (error) {
        if(error.code === 'P2002'){
            const err = new Error('Conflict: Email is already in use.');
            err.status = 409;
            throw err;
        }
        throw error;
    }
}

export async function findByEmail(email) {
    const user = await primsa.user.findUnique({
        where: {
            email: email
        }
    });
    return user;
}

export async function getById(id) {
    const user = await primsa.user.findUnique({
        where: {
            id: id
        },
        omit: {
            password: true
        }
    });
    return user;
}

export async function remove(id) {
    try {
        const user = await primsa.user.delete({
            where:{
                id: id
            },
            omit: {
                password: true
            }
        });
        return user;
    } catch (error) {
        if(error.code === 'P2025'){
            return null;
        }
        throw error;
    }
}

export async function getAll() {
    const users = await prisma.user.findMany({
        omit: {
            password: true
        }
    });
    return users;
}

export async function update(id, data) {
    try {
        const user = await prisma.user.update({
            data,
            where: {
                id: id
            },
            omit: {
                password: true
            }
        });
        return user;
    } catch (error) {
        if(error.code === 'P2025'){
            throw NotFoundError;
        }
        if(error.code === 'P2002'){
            const err = new Error('Conflict: Email is already in use.');
            err.status = 409;
            throw err;
        }
        throw error
    }
}
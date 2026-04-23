import prisma from "../config/db.js";
import NotFoundError from "../errors/NotFoundError.js";

const ConflictError = new Error('Conflict: owner already has a zoo with this name in this location');
ConflictError.status = 409;

export async function getAll() {
    const zoos = await prisma.zoo.findMany();
    return zoos;
}

export async function getById(id) {
    const zoo = await prisma.zoo.findUnique({
        where:{
            id: id
        }
    });
    return zoo;
}

export async function create(data) {
    try {
        const zoo = await prisma.zoo.create({
            data: data
        });
        return zoo;
    } catch (error) {
        if(error.code === 'P2002'){
            throw ConflictError;
        }
        throw error;
    }
}

export async function update(id, data) {
    try {
        const zoo = await prisma.zoo.update({
            where:{
                id: id
            },
            data: data
        });
        return zoo;
    } catch (error) {
        if(error.code === 'P2002'){
            throw ConflictError;
        }
        if(error.code === 'P2025'){
            return null;
        }
        throw error;
    }
}

export async function remove(id) {
    try {
        const zoo = await prisma.zoo.delete({
            where:{
                id: id
            }
        });
        return zoo;
    } catch (error) {
        if(error.code === 'P2025'){
            return null
        }
        throw error;
    }
}
import prisma from "../config/db.js";

const ConflictError = new Error('Conflict: An animal with this nickname and species already exists at this zoo');
ConflictError.status = 409;

const ForeignKeyError = new Error('Bad Input: There is no zoo associated with the id provided');
ForeignKeyError.status = 400;

export async function getAll() {
    const animals = await prisma.animal.findMany();
    return animals;
}

export async function getById(id) {
    const animal = await prisma.animal.findUnique({
        where:{
            id: id
        }
    });
    return animal;
}

export async function create(data) {
    try {
        const animal = await prisma.animal.create({
            data: data
        });
        return animal;
    } catch(error){
        if(error.code === 'P2002'){
            throw ConflictError;
        }
        if(error.code === 'P2003'){
            throw ForeignKeyError;
        }
        throw error;
    }
}

export async function update(id, data) {
    try {
        const animal = await prisma.animal.update({
            where:{
                id: id
            },
            data: data
        });
        return animal;
    } catch(error){
        if(error.code === 'P2002'){
            throw ConflictError;
        }
        if(error.code === 'P2025'){
            return null;
        }
        if(error.code === 'P2003'){
            throw ForeignKeyError;
        }
        throw error;
    }
}

export async function remove(id) {
    try {
        const animal = await prisma.animal.delete({
            where: {
                id: id
            }
        });
        return animal;
    } catch (error) {
        if(error.code === 'P2025'){
            return null;
        }
        throw error;
    }
}

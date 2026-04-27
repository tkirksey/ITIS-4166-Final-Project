import prisma from "../config/db.js";

const ConflictError = new Error('Conflict: Owner already has a review for this zoo');
ConflictError.status = 409;

const ForeignKeyError = new Error('Bad Input: There is no user or zoo associated with an id provided')
ForeignKeyError.status = 400;

export async function getAll() {
    const reviews = await prisma.review.findMany();
    return reviews;
}

export async function getById(id) {
    try {
        const review = await prisma.review.findUnique({
            where:{
                id: id
            }
        });
        return review;
    } catch (error) {
        if(error.code === 'P2025'){
            return null;
        }
        throw error;
    }
}

export async function create(data) {
    try {
        const review = await prisma.review.create({
            data: data
        });
        return review;
    } catch (error) {
        if(error.code === 'P2003'){
            throw ForeignKeyError;
        }
        if(error.code === 'P2002'){
            throw ConflictError;
        }
        throw error;
    }
}

export async function update(id, data) {
    try {
        const review = await prisma.review.update({
            where:{
                id: id
            },
            data: data
        });
        return review;
    } catch (error) {
        if(error.code === 'P2003'){
            throw ForeignKeyError;
        }
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
        const review = await prisma.review.delete({
            where:{
                id: id
            }
        });
        return review;
    } catch(error) {
        if(error.code === 'P2025'){
            return null;
        }
        throw error;
    }
}
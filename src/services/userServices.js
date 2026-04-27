import NotFoundError from "../errors/NotFoundError.js";
import { create, getAll, getById, getUsersReviews, getUsersZoos, remove, update } from "../repositories/userRepo.js";
import bcrypt from "bcrypt";

export async function getUserById(id) {
    const user = await getById(id);
    if (!user) {
        throw NotFoundError;
    }
    return user;
}

export async function deleteUserById(id) {
    const user = await remove(id);
    if (!user) {
        throw NotFoundError;
    }
    return user;
}

export async function getAllUsers() {
    return await getAll();
}

export async function createUser(email, password, role) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await create({ email, role, password: hashedPassword });
    return user;
}

export async function updateUser(id, email, password, role) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await update(id, { email, password: hashedPassword, role });

    if(!user){
        throw NotFoundError;
    }
    
    return user;
}

export async function getZoosOwnedByUser(id) {
    
    const zoos = await getUsersZoos(id);

    if(!zoos){
        throw NotFoundError;
    }

    return zoos;

}

export async function getReviewsAuthoredByUser(id) {
    
    const reveiws = await getUsersReviews(id);

    if(!reveiws){
        throw NotFoundError;
    }

    return reveiws;

}
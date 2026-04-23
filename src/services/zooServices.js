import NotFoundError from "../errors/NotFoundError.js";
import { create, getAll, getById, remove, update } from "../repositories/zooRepo.js";

export async function getAllZoos() {
    const zoos = await getAll();
    return zoos;
}

export async function getZooById(id) {
    const zoo = await getById(id);

    if(!zoo){
        throw NotFoundError;
    }

    return zoo;
}

export async function createZoo(name, location, yearOpened, ownerId) {
    const zoo = await create({name, location, yearOpened, ownerId});
    return zoo;
}

export async function updateZoo(id, name, location, yearOpened, ownerId) {
    const zoo = await update(id, {name, location, yearOpened, ownerId});

    if(!zoo){
        throw NotFoundError;
    }

    return zoo;
}

export async function deleteZoo(id) {
    const zoo = await remove(id);

    if(!zoo){
        throw NotFoundError;
    }

    return zoo;
}


import NotFoundError from '../errors/NotFoundError.js';
import { getAll, getById, create, update, remove } from '../repositories/animalRepo.js';

export async function getAllAnimals() {
    const animals = await getAll();
    return animals;
}

export async function getAnimalById(id) {
    const animal = await getById();
    if(!animal){
        throw NotFoundError;
    }
    return animal;
}

export async function createAnimal(nickname, species, zooId) {
    const animal = await create({nickname, species, zooId});
    return animal;
}

export async function updateAnimal(id, nickname, species, zooId) {
    const animal = await update(id, {nickname, species, zooId});

    if(!animal){
        throw NotFoundError;
    }

    return animal;
}

export async function deleteAnimal(id) {
    const animal = await remove(id);

    if(!animal){
        throw NotFoundError;
    }

    return animal;
}

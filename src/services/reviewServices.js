import {
    getAll,
    getById,
    create,
    update,
    remove
} from '../repositories/reviewRepo.js'

import NotFoundError from '../errors/NotFoundError.js';

export async function getAllReviews() {
    const reviews = await getAll();
    return reviews;
}

export async function getReviewById(id) {
    const review = await getById(id);
    if(!review){
        throw NotFoundError;
    }
    return review;
}

export async function createReview(rating, content, authorId, zooId) {
    const review = await create({rating, content, authorId, zooId});
    return review;
}

export async function updateReview(id, rating, content, authorId, zooId) {
    const review = await update(id, {rating, content, authorId, zooId});
    if(!review){
        throw NotFoundError;
    }
    return review;
}

export async function deleteReview(id) {
    const review = await remove(id);
    if(!review){
        throw NotFoundError;
    }
    return review;
}
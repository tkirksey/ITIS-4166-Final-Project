import {
    getAllReviews,
    getReviewById,
    createReview,
    updateReview,
    deleteReview
} from '../services/reviewServices.js'

export async function getAllReviewsHandler(req, res) {
    const reviews = await getAllReviews();
    res.status(200).json(reviews);
}

export async function getReviewByIdHandler(req, res) {
    const id = parseInt(req.params.id);
    const review = await getReviewById(id);
    res.status(200).json(review);
}

export async function createReviewHandler(req, res) {
    const rating = parseInt(req.body.rating);
    const { content } = req.body;
    const authorId = parseInt(req.body.authorId);
    const zooId = parseInt(req.body.zooId);
    const review = await createReview(rating, content, authorId, zooId);
    res.status(201).json(review);
}

export async function updateReviewHandler(req, res) {
    const id = parseInt(req.params.id);

    let rating = undefined;
    if(req.body.rating){
        rating = parseInt(req.body.rating);
    }

    const { content } = req.body;

    let authorId = undefined;
    if(req.body.authorId){
        authorId = parseInt(req.body.authorId);
    }

    let zooId = undefined;
    if(req.body.zooId){
        zooId = parseInt(req.body.zooId);
    }

    const review = await updateReview(id, rating, content, authorId, zooId);

    res.status(200).json(review);
}

export async function deleteReviewHandler(req, res) {
    const id = parseInt(req.params.id);
    await deleteReview(id);
    res.status(204).json({message:'Review was successfully deleted'});
}
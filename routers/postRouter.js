import Router from 'express'
import authMiddleware from '../middlewares/authMiddleware.js'
import {createPost, getAllPosts, getPosts, editPost, deletePost} from '../controllers/postApi/barrel.js'

const postRouter = Router()

postRouter
    .post("/blog/create/:id", createPost)

    .get("/blogs", getAllPosts)
    .get("/blogs/:id",authMiddleware, getPosts)

    .put("/blog/update/:id",authMiddleware, editPost)
    .delete("/blog/delete/:id",authMiddleware, deletePost)


export default postRouter 
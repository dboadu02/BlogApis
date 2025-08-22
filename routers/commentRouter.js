import Router from 'express'
import {createComment, editComment, getComments, deleteComment} from '../controllers/commentApis/barrel.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const commentRouter = Router()

commentRouter
        .post("/comment/create/:postId",authMiddleware, createComment)
        .get("/comments/:id",authMiddleware, getComments)
        .put("/comment/edit/:id",authMiddleware, editComment)
        .delete("/comment/delete/:id", authMiddleware, deleteComment)



export default commentRouter
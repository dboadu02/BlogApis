import Comment from '../../models/commentModel.js'

export const deleteComment = async (req, res) => {
    const {id} = req.params
    const {_id, isAdmin} = req.user

    try{
        const comment = await Comment.findById(id)
        if(!comment){
            return res.status(400).json({ message: "Comment not found" });
        }

        if(comment.user.toString() === _id || isAdmin){
            await Comment.deleteOne({_id: id})
            res.status(200).json({ message: "Post successfully deleted" })
            return
        } else{
            res.json({ message: "You are not authorised to delete post" })
            return
        }
    }catch(err){
        console.log(err.message)
        return res.status(500).json({message: 'Internal server error'})
    }
}
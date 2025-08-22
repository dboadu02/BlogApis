import Comment from '../../models/commentModel.js'

export const editComment = async (req, res) => {
    const {text} = req.body
    const userId = req.user.id
    const {id} = req.params //comment id 

    try{
        const comment = await Comment.findById(id)
        if(!comment){
            return res.status(400).json({ message: "Comment not found" });
        }
        //check if the user making edit is the same as the user who created comment 
        if(comment.user.toString() !== userId){
             return res.status(400).json({ message: "You are not authorized to edit" });
        }
        //proceed to edit 
        comment.text = text ?? comment.text
        await comment.save()

        res.status(200).json({message: 'comment updated', comment})



    }catch(err){
        console.log(err.message)
        return  res.status(500).json({ message: "Internal server error" })
    }
}
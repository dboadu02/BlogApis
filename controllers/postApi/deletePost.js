import Post from '../../models/postModel.js'


export const deletePost = async (req, res) => {
    const {id} = req.params
    const {_id, isAdmin} = req.user

    try{
        const blog = await Post.findById(id)
        if(!blog){
             return res.status(400).json({ message: "Post not found" });
        }

        //check if user is the author of the post or an admin
        if(blog.author.toString() === _id || isAdmin){
            await Post.deleteOne({_id: id})
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
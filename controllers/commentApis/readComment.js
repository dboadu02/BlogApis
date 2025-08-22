import Comment from '../../models/commentModel.js'
import Post from '../../models/postModel.js'


//GET ALL COMMENTS FOR A PARTICULAR POST
export const getComments = async (req, res) => {
    const {id} = req.params //post or blog id

    try{
        //check if post exist
        const blogPost = await Post.findById(id)
        if(!blogPost){
            return res.status(400).json({message: 'Post not found'})
        }
        //check if there are comments for the post if it exists
        const comments = await Comment.find({post: id})
        if(comments.length === 0){
            return res.status(400).json({ message: "No comments available" });
        }

        res.status(200).json(comments)

    } catch(err){
        console.log(err.message)
        return res.status(500).json({ message: "Internal server error" })
    }
}

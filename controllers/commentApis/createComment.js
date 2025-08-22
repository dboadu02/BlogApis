import Comment from '../../models/commentModel.js'
import Post from '../../models/postModel.js'


export const createComment = async (req, res) => {
    const {postId} = req.params //for post id
    const {text} = req.body
    const userId = req.user.id //id of user

    try{
        //check if post exists
        const post = await Post.findById(postId);
        if (!post) {
          return res.status(400).json({ message: "Post not found" });
        }
        
        if(!text) return res.status(400).json({message: 'input comment'});

        const comment = new Comment({
            text,
            post: postId,
            user: userId
        })
        await comment.save()
        res.json(comment)


        
    }catch(err){
        console.log(err.message)
        return res.status(500).json({message: 'Internal server error'})
    }
}
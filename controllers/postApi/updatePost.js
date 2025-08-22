import Post from '../../models/postModel.js'


export const editPost = async (req, res) => {
    const {title, content} = req.body
    const {id} = req.params
    const userId = req.user.id

    try{
        //check if post exists
        const blogPost = await Post.findById(id)
        if(!blogPost){
            res.status(400).json({message: 'Post not found'})
            return
        }

        //if the post exist then check if it was created by user trying to update it.
        if(blogPost.author.toString() !== userId){
            res.status(500).json({message: 'You are not authorised to edit this post'})
            return
        }

        //proceed to make changes
        blogPost.title = title ?? blogPost.title
        blogPost.content = content ?? blogPost.content

        await blogPost.save()
        res.status(200).json({message: 'successfully updated blog post', updatedBlog: blogPost})

        

    }catch(err){
        console.log(err.message)
        return res.status(500).json({message: 'Internal server error'})
    }
}
import Post from '../../models/postModel.js'
import User from '../../models/userModel.js'


export const createPost = async (req, res) => {
    const {title, content} = req.body
    const {id} = req.params

    //validate input field
     if(!title || !content){
        return res.status(400).json({ message: "All fields are required" })
     }
    try{
        //check if user exists
        const user = await User.findById(id)
        if(!user){
            return res.status(400).json({ message: "User not found, please create an account" });
        }

        //proceed to create post 
        const blogPost = new Post({
            title,
            content,
            author: user.id,
        })
       
        await blogPost.save()
        res.json({message: 'Blog succesfully uploaded',post: blogPost})
    }catch(err){
         res.status(500).json({ error: err.message });
    }
}

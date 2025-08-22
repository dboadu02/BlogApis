import Post from '../../models/postModel.js'


//GET ALL BLOGS 
export const getAllPosts = async (req, res) => {
    try{
        const blogs = await Post.find().populate('author', 'username')
        if(!blogs){
           return res.status(400).json({message: 'No blog post found'})
        }
        
        res.json(blogs)

    }catch(err){
        console.log(err.message)
        return res.status(500).json({message: 'Internal server error'})
    }
}


//GET ALL BLOGS BY A USER
export const getPosts = async (req, res) => {
    const {id} = req.params //author id

    try{
        //check if there are posts by an author
        const blogs = await Post.find({author: id}).populate('author', 'firstName lastName email username')
        //check if blogs return anything
        if(blogs.length === 0){
            return res.status(400).json({message: 'no post found'})
        }

        
        res.status(200).json(blogs)

    }catch(err){
        console.log(err.message)
        return res.status(500).json({message: 'Internal server error'})
    }
}

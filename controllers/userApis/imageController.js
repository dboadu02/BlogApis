import User from '../../models/userModel.js'
import fs from 'fs'

//UPLOAD A PROFILE PICTURE
export const uploadImage = async (req, res) => {
    const { id } = req.params;

    //check if a file has been passed in req
    try{
          if(!req.file) return res.status(400).json({ mess: "no file uploaded" });

            const user = await User.findById(id);
            if (!user) return res.json({ mess: "user not found" });

            //link image path to the user if there is a file in req
            user.profilePic = req.file ? req.file.path : null;
            await user.save();

            res.status(200).json({ mess: "File uploaded successfully", file: req.file })
            return

        }catch(err){
            console.log(err.message)
            return res.status(500).json({message: 'Internal service error'})

        }

}


//UPDATE PROFILE PICTURE
export const updateImage = async (req, res) => {
    const {id} = req.params

    try {
      if(!req.file) return res.status(400).json({ mess: "no file uploaded" })

      const user = await User.findById(id)
      if (!user) return res.status(404).json({ message: "User not found" })

      // remove saved old profilePic using path that was saved in db
      if (fs.existsSync(user.profilePic)) {
      fs.unlinkSync(user.profilePic)
      }

      // update with value of user profilePic with path of req.file
      user.profilePic = req.file ? req.file.path : user.profilePic
      await user.save()
      res.json({ message: "Profile picture updated", profilePic: user.profilePic })

      } catch (err) {
      res.status(500).json({ error: err.message }) 
    }
}


//DELETE PROFILE PICTURE
export const deleteImage = async (req, res) => {
  const {id} = req.params
  const userId = req.user.id

  if(userId !== id) return res.status(403).json({message: 'You are not authorised'})

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // delete file if it exist
    if (!fs.existsSync(user.profilePic)) {
      return res.status(404).json({ message: "file not found" })
    }
    fs.unlinkSync(user.profilePic)

    user.profilePic = null; // clear field in DB
    await user.save();

    res.json({ message: "Profile picture removed" });
  } catch (err) {
  res.status(500).json({ error: err.message })
  return
  }
}
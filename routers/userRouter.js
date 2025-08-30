import Router from "express";
import {createUser,makeAdmin,getUser,getAllUsers,updateUser,deleteUser} from "../controllers/userApis/barrel.js";
import { isUser } from "../middlewares/isUser.js";
import {updateImage,uploadImage,deleteImage} from "../controllers/userApis/imageController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import upload from "../middlewares/imageUpload.js";
import checkUlitimateAdmin from "../middlewares/checkUltimateAdmin.js";
import checkAdmin from "../middlewares/checkAdminStatus.js";


const userRouter = Router();

userRouter
  .post("/signup", upload.single("profilePic"), createUser)
  .post("/user/makeAdmin/:id", authMiddleware, checkUlitimateAdmin, makeAdmin) //make a user an admin

  .get("/user/:id", authMiddleware, getUser)
  .get("/users", authMiddleware, checkAdmin, getAllUsers)

  .put("user/edit/:id", authMiddleware, updateUser)

  .delete("user/delete/:id", authMiddleware, deleteUser)

  //FOR IMAGE
  .post("/uploadImage/:id",authMiddleware,isUser,upload.single("profilePic"),uploadImage)
  .put("/updateImage/:id",authMiddleware,isUser,upload.single("profilePic"),updateImage)
  .delete("/deleteImage/:id", authMiddleware, deleteImage)
  

export default userRouter;

import express from "express";
import {
  Register,
  Login,
  RefreshToken,
  GetUserData,
  SearchUser,
  updateUserProfile
} from "../controllers/user.controller";
import { tokenChecker } from "../middlewares/tokenChecker";
import multer from "multer";
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "uploads");
  },
  filename: (req, file, callBack) => {
    callBack(null, `Sender_${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

router.post("/register", Register);

router.post("/login", Login);

router.get("/refreshToken/:userId", RefreshToken);

router.get("/userData/:userId", tokenChecker, GetUserData);

router.get("/search/:searchString", tokenChecker, SearchUser);

router.post("/updateProfile", upload.single('file'), updateUserProfile);
export default router;

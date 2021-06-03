import multer from "multer";
import express from "express";
import { isAuth } from "../utils.js";

const uploadRouter = express.Router();
// const imageMimeType = ["image/jpeg", "image/png", "image/gif"];
const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, "uploads/");
	},
	filename(req, file, cb) {
		cb(null, `image${Date.now()}.jpg`);
	},
	// mimetype: imageMimeType,
});

const upload = multer({ storage });

uploadRouter.post("/", isAuth, upload.single("image"), (req, res) => {
	res.send(`/${req.file.path}`);
});

export default uploadRouter;

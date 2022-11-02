import express from 'express';
import multer from 'multer';
import { isAdmin, isAuth } from '../utils.js';

const uploadImageRouter = express.Router();

const storage = multer.diskStorage({
    destination(req,file,cd) {
        cd(null, 'uploads/');
    },
    filename(req,file,cd) {
        cd(null, Date.now() + "--" + file.originalname);
    }
});

const upload =  multer({storage});

uploadImageRouter.post(
    '/', 
    isAuth,
    isAdmin,
    upload.single('image'),
    (req,res) => {
        res.send(`/${req.file.path}`);
});

export default uploadImageRouter;
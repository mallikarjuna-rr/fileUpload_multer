const express = require('express');
const multer = require('multer')
const fs = require('fs')
const path = require('path')


const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:true}))

const dirPath = path.join(__dirname,'images')
if(!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath)
}

const fileStorage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null,dirPath)
    },
    filename:(req,file,cb) => {
        cb(null,file.originalname)
    }
})

const upload = multer({
    storage: fileStorage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
})


app.post('/single',upload.single('images'),(req,res) => {
    console.log(req.file);
    res.send("single")
})
app.listen(3000,() => {
    console.log("Server is running")
})
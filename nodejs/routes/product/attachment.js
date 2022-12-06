const express = require('express');
const router = express.Router();

require('dotenv').config();

const mongoose = require('mongoose');
const {Schema} = mongoose;
mongoose.connect("mongodb+srv://" + process.env.MONGODB_ID + ":" + process.env.MONGODB_PW + "@" + process.env.MONGODB_HOST + "/" + process.env.MONGODB_DB + "?retryWrites=true&w=majority", {useNewUrlParser: true});

const AttachmentSchema = new Schema({
    contentType: String,
    data: Buffer
});

const Attachment = mongoose.model("Attachment", AttachmentSchema);

const fs = require('fs');
const multer = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');

// Creating Bucket
let bucket;
mongoose.connection.on("connected", () => {
    let db = mongoose.connections[0].db;
    bucket = new mongoose.mongo.GridFSBucket(db, {
        bucketName: "product_attachments"
    });
    console.log(bucket);
})

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "uploads");
    },
    filename(req, file, callback) {
        callback(null, file.fieldname + "-" + Date.now());
    }
});

const upload = multer({storage: storage});

router.post('/upload', upload.array('images'), async (req, res, next) => {
    console.log(req.body);
    console.log(req.file);
});

module.exports = router;

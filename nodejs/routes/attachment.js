const express = require('express');
const router = express.Router();
const fs = require('fs');
const multer = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');
const mongoose = require("mongoose");
const mongouri = "mongodb+srv://" + process.env.MONGODB_ID + ":" + process.env.MONGODB_PW + "@" + process.env.MONGODB_HOST + "/" + process.env.MONGODB_DB + "?retryWrites=true&w=majority";
mongoose.connect(mongouri, {useNewUrlParser: true});

// Creating Bucket
let bucket;
mongoose.connection.on("connected", () => {
    let db = mongoose.connections[0].db;
    bucket = new mongoose.mongo.GridFSBucket(db, {
        bucketName: "attachments"
    });
    console.log(bucket);
})

const storage = new GridFsStorage({
    url: mongouri,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            const filename = file.originalname;
            const fileInfo = {
                filename: filename,
                bucketName: "attachments"
            };
            resolve(fileInfo);
        });
    }
});

const upload = multer({storage: storage});

// const AttachmentSchema = new mongoose.Schema({
//     type: String,
//     data: Buffer
// });
//
// const Attachment = mongoose.model("Attachment", AttachmentSchema);

router.get('/api/product/attachment/info', async (req, res, next) => {
    // const stream = bucket.openDownloadStream(ObjectId(req.query.id));
    //
    // stream.on('data', (chunk) => {
    //     console.log(chunk);
    //     res.set('content-type', 'image/jpeg');
    //     res.set('accept-ranges', 'bytes');
    //     res.write(chunk);
    // });
    res.json();
});

router.get('/api/product/attachment/all', async (req, res, next) => {
    const cursor = await bucket.find({});
    cursor.forEach(doc => console.log(doc));
    res.json(cursor);
});

module.exports = {router, fs, multer, GridFsStorage, bucket, storage, upload};






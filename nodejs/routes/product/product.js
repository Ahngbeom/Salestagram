const express = require('express');
const router = express.Router();

require('dotenv').config();

const mongoose = require('mongoose');
const mongouri = "mongodb+srv://" + process.env.MONGODB_ID + ":" + process.env.MONGODB_PW + "@" + process.env.MONGODB_HOST + "/" + process.env.MONGODB_DB + "?retryWrites=true&w=majority";
mongoose.connect(mongouri, {useNewUrlParser: true});

const {fs, multer, GridFsStorage, bucket, storage, upload, AttachmentSchema, Attachment} = require('../attachment');

const productSchema = new mongoose.Schema({
    // _id: Schema.Types.ObjectId,
    name: {type: String, required: true},
    details: {type: String, required: true},
    // attachments: [AttachmentSchema],
    attachments: [{type: String}],
    views: {type: Number, default: 0},
    like: {type: Number, default: 0},
    registration_date: {type: Date, default: Date.now()},
    update_date: {type: Date, default: Date.now()}
})

const Product = mongoose.model('Product', productSchema);

/* GET home page. */
router.get('/', async (req, res, next) => {
    res.render('index', {title: 'Salestagram'});
});

// router.get('/product/register', async (req, res, next) => {
//     res.render('product/register', {title: 'Salestagram - Register'});
// });

router.get('/api/product/list', async (req, res, next) => {
    res.json(await Product.find());
});

router.get('/api/product/info', async (req, res, next) => {
    res.json(await Product.findById(req.query.id));
});

router.post('/api/product/registration', upload.array('images'), async (req, res, next) => {
    console.log(req.body);
    const product = new Product({
        name: req.body.name,
        details: req.body.details
    });

    for (const file of req.files) {
        console.log(file);
        // const attachment = new Attachment({
        //     type: file.mimetype,
        //     data: fs.readFileSync(file.path)
        // });
        // await attachment.save()
        //     .then(() => {
        //         console.log("Saved: " + attachment);
        //     })
        //     .catch((err) => {
        //         console.error("Error: " + err);
        //     });
        product.attachments.push(file.id);
        // fs.unlink(file.path, function (err) {
        //     if (err)
        //         throw err;
        //     console.log('successfully deleted ' + file.path);
        // });
    }
    // console.log(productAttachments);

    await product.save()
        .then(() => {
            console.log("Saved: " + product);
        })
        .catch((err) => {
            console.error("Error: " + err);
        });

    res.json(product._id);
});

router.post('/api/product/remove', async (req, res, next) => {
    const id = req.body.id;
    await Product.findByIdAndDelete(id);
    res.json(id);
});

router.post('/api/product/modify', async (req, res, next) => {
    res.json(await Product.findByIdAndUpdate(req.body._id,
            {
                name: req.body.name,
                details: req.body.details,
                update_date: Date.now()
            }, {returnDocument: "after"}
        )
    );
});

router.post('/api/product/like/increase', async (req, res, next) => {
    res.json(await Product.findByIdAndUpdate(req.body.id, {$inc: {like: 1}}, {returnDocument: "after"}));
});

module.exports = router;
